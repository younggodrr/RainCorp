"""
Authentication middleware for Magna AI Agent API.

Integrates with existing Magna platform authentication.
"""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from ..config import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)

# Security scheme for JWT bearer tokens
security = HTTPBearer()


class User:
    """User model for authenticated requests."""
    
    def __init__(self, user_id: str, email: str, username: str):
        self.id = user_id
        self.email = email
        self.username = username


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    """
    Extract and validate JWT token from request.
    
    Args:
        credentials: HTTP authorization credentials with bearer token
        
    Returns:
        User object with authenticated user information
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    token = credentials.credentials
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=["HS256"]
        )
        
        # Extract user information
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        username: str = payload.get("username")
        
        if user_id is None:
            logger.warning("Token missing user ID")
            raise credentials_exception
            
        logger.debug(f"Authenticated user: {user_id}")
        
        return User(user_id=user_id, email=email or "", username=username or "")
        
    except JWTError as e:
        logger.warning(f"JWT validation error: {e}")
        raise credentials_exception


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False))
) -> User:
    """
    Extract and validate JWT token from request, or create dev user if no token in development.
    
    This allows the frontend to work without authentication during development.
    In production, authentication is always required.
    
    Args:
        credentials: Optional HTTP authorization credentials with bearer token
        
    Returns:
        User object with authenticated user information or dev user
        
    Raises:
        HTTPException: If token is invalid or expired (production only)
    """
    # If no credentials provided and in development, return dev user
    if credentials is None:
        if settings.environment == "development":
            logger.info("No auth token provided, using development user")
            return User(
                user_id="dev_user_123",
                email="dev@example.com",
                username="devuser"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    # If credentials provided, try to validate them
    # In development mode, if validation fails, return dev user
    try:
        token = credentials.credentials
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=["HS256"]
        )
        
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        username: str = payload.get("username")
        
        if user_id is None:
            raise ValueError("Token missing user ID")
            
        logger.debug(f"Authenticated user: {user_id}")
        return User(user_id=user_id, email=email or "", username=username or "")
        
    except (JWTError, ValueError) as e:
        # In development, fall back to dev user if token is invalid
        if settings.environment == "development":
            logger.info(f"Invalid token in development mode, using dev user: {e}")
            return User(
                user_id="dev_user_123",
                email="dev@example.com",
                username="devuser"
            )
        else:
            # In production, reject invalid tokens
            logger.warning(f"JWT validation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )


async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Optional[User]:
    """
    Extract user from token if provided, otherwise return None.
    
    Useful for endpoints that work with or without authentication.
    
    Args:
        credentials: Optional HTTP authorization credentials
        
    Returns:
        User object if authenticated, None otherwise
    """
    if credentials is None:
        return None
        
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None

