"""
Chat API endpoints for Magna AI Agent.
"""

import uuid
from datetime import datetime
from typing import AsyncIterator, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sse_starlette.sse import EventSourceResponse

from .auth import User, get_current_user, get_current_user_optional
from .models import (
    ChatMessageRequest,
    ChatMessageResponse,
    ConversationSummary,
    ConversationDetail,
    ConsentResponse,
    ConsentResult,
    ErrorResponse,
    Message,
    MessageRole,
    ConsentStatus
)
from ..agent.core import MagnaAgent
from ..utils.logging import get_logger

logger = get_logger(__name__)

# Create router
router = APIRouter()


async def get_agent(model_override: Optional[str] = None) -> MagnaAgent:
    """
    Get the initialized MagnaAgent instance from integration.
    
    Args:
        model_override: Optional model ID to override the default
    
    Returns:
        Configured MagnaAgent instance
        
    Raises:
        RuntimeError: If integration not initialized
    """
    from ..integration import get_integration
    integration = await get_integration()
    
    # If model override is provided, update the agent's LLM provider
    if model_override:
        current_model = getattr(integration.agent.llm_orchestrator.primary_provider, 'model_name', None)
        if current_model and model_override != current_model:
            logger.info(f"Switching agent model from {current_model} to {model_override}")
            from ..llm.factory import create_nvidia_nim_provider, create_gemini_provider
            from ..config import settings
            
            # Create new provider with the selected model
            if model_override.startswith("meta/") or model_override.startswith("deepseek-ai/"):
                # NVIDIA NIM model
                from ..llm.providers import NVIDIANIMProvider, LLMConfig
                config = LLMConfig(
                    temperature=settings.llm_temperature,
                    top_p=settings.llm_top_p,
                    max_tokens=settings.llm_max_tokens,
                    timeout_seconds=settings.llm_timeout_seconds
                )
                new_provider = NVIDIANIMProvider(
                    api_key=settings.nvidia_nim_api_key,
                    config=config,
                    model=model_override
                )
                # CRITICAL: Initialize the new provider
                await new_provider.initialize()
                integration.agent.llm_orchestrator.primary_provider = new_provider
                logger.info(f"Successfully switched to {model_override}")
            elif model_override.startswith("gemini"):
                # Gemini model
                new_provider = create_gemini_provider(settings)
                if new_provider:
                    await new_provider.initialize()
                    integration.agent.llm_orchestrator.primary_provider = new_provider
                    logger.info(f"Successfully switched to Gemini")
    
    return integration.agent


@router.post(
    "/message",
    response_model=ChatMessageResponse,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def send_message(
    request: ChatMessageRequest,
    user: User = Depends(get_current_user_optional)
):
    """
    Send a message to the AI agent and receive a response.
    
    Supports both streaming and non-streaming responses.
    
    Args:
        request: Chat message request with message content and optional conversation ID
        user: Authenticated user from JWT token
        
    Returns:
        ChatMessageResponse with agent's reply and metadata
        
    Raises:
        HTTPException: If message processing fails
    """
    try:
        logger.info(f"Processing message from user {user.id}")
        
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Get user's selected model
        from .models_api import get_user_model
        selected_model = get_user_model(user.id)
        logger.info(f"Using model {selected_model} for user {user.id}")
        
        # Get agent instance with user's selected model
        agent = await get_agent(model_override=selected_model)
        
        if request.stream:
            # Return streaming response
            async def generate_stream() -> AsyncIterator[str]:
                """Generate Server-Sent Events stream."""
                try:
                    chunk_count = 0
                    async for chunk in agent.process_message(
                        user_id=user.id,
                        message=request.message,
                        conversation_id=conversation_id,
                        stream=True
                    ):
                        # Only yield non-empty content
                        if chunk.content and chunk.content.strip():
                            chunk_count += 1
                            # EventSourceResponse automatically adds "data: " prefix
                            # So we just yield the content directly
                            yield chunk.content
                    
                    logger.info(f"Stream complete, sent {chunk_count} chunks")
                    # Send completion event
                    yield "[DONE]"
                    
                except Exception as e:
                    logger.error(f"Error in streaming response: {e}", exc_info=True)
                    yield f"Error: {str(e)}"
            
            return EventSourceResponse(generate_stream())
        
        else:
            # Non-streaming response
            response_content = ""
            tool_calls = []
            results = []
            requires_consent = None
            
            async for chunk in agent.process_message(
                user_id=user.id,
                message=request.message,
                conversation_id=conversation_id,
                stream=False
            ):
                response_content += chunk.content
                if chunk.tool_calls:
                    tool_calls.extend(chunk.tool_calls)
                if chunk.results:
                    results.extend(chunk.results)
                if chunk.requires_consent:
                    requires_consent = chunk.requires_consent
            
            return ChatMessageResponse(
                conversation_id=conversation_id,
                message_id=str(uuid.uuid4()),
                content=response_content,
                timestamp=datetime.utcnow(),
                tool_calls=tool_calls if tool_calls else None,
                results=results if results else None,
                requires_consent=requires_consent
            )
    
    except ValueError as e:
        logger.warning(f"Invalid request: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error processing message: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process message"
        )


@router.get(
    "/conversations",
    response_model=List[ConversationSummary],
    responses={
        401: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def list_conversations(
    limit: int = 20,
    offset: int = 0,
    user: User = Depends(get_current_user_optional)
):
    """
    List user's conversation history.
    
    Args:
        limit: Maximum number of conversations to return (default: 20)
        offset: Number of conversations to skip (default: 0)
        user: Authenticated user from JWT token
        
    Returns:
        List of conversation summaries ordered by most recent first
        
    Raises:
        HTTPException: If retrieval fails
    """
    try:
        logger.info(f"Listing conversations for user {user.id}")
        
        # TODO: Implement database query for conversations
        # For now, return empty list
        conversations = []
        
        # Example implementation:
        # conversations = await conversation_service.list_conversations(
        #     user_id=user.id,
        #     limit=limit,
        #     offset=offset
        # )
        
        return conversations
    
    except Exception as e:
        logger.error(f"Error listing conversations: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve conversations"
        )


@router.get(
    "/conversations/{conversation_id}",
    response_model=ConversationDetail,
    responses={
        401: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def get_conversation(
    conversation_id: str,
    user: User = Depends(get_current_user_optional)
):
    """
    Get detailed conversation with all messages.
    
    Args:
        conversation_id: Conversation identifier
        user: Authenticated user from JWT token
        
    Returns:
        ConversationDetail with all messages
        
    Raises:
        HTTPException: If conversation not found or access denied
    """
    try:
        logger.info(f"Retrieving conversation {conversation_id} for user {user.id}")
        
        # TODO: Implement database query for conversation
        # For now, raise not found
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
        
        # Example implementation:
        # conversation = await conversation_service.get_conversation(
        #     conversation_id=conversation_id,
        #     user_id=user.id
        # )
        # 
        # if conversation is None:
        #     raise HTTPException(
        #         status_code=status.HTTP_404_NOT_FOUND,
        #         detail="Conversation not found"
        #     )
        # 
        # return conversation
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving conversation: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve conversation"
        )


@router.post(
    "/consent",
    response_model=ConsentResult,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def handle_consent(
    response: ConsentResponse,
    user: User = Depends(get_current_user_optional)
):
    """
    Handle user consent response for document submission or data sharing.
    
    Args:
        response: User's consent decision (approved/denied)
        user: Authenticated user from JWT token
        
    Returns:
        ConsentResult with updated status and optional consent token
        
    Raises:
        HTTPException: If consent request not found or processing fails
    """
    try:
        logger.info(
            f"Processing consent {response.consent_request_id} "
            f"for user {user.id}: {'approved' if response.approved else 'denied'}"
        )
        
        # Get consent manager from integration
        from ..integration import get_integration
        integration = await get_integration()
        consent_manager = integration.consent_manager
        
        # Process consent
        result = await consent_manager.process_consent(
            user_id=user.id,
            consent_request_id=response.consent_request_id,
            approved=response.approved
        )
        
        return ConsentResult(
            consent_request_id=response.consent_request_id,
            status=ConsentStatus.APPROVED if result.approved else ConsentStatus.DENIED,
            consent_token=result.consent_token if result.approved else None,
            message=result.message
        )
    
    except ValueError as e:
        logger.warning(f"Invalid consent request: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error processing consent: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process consent"
        )

