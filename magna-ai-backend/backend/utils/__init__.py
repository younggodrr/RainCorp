"""
Utility Functions Module

Helper functions for logging, encryption, validation, error handling, etc.
"""

from .encryption import encrypt_data, decrypt_data
from .logging import (
    setup_logging,
    get_logger,
    setup_alert_service,
    get_alert_service,
    log_error,
    determine_severity,
    ErrorLog,
    ErrorSeverity,
    AlertService
)
from .exceptions import (
    MagnaAIError,
    LLMError, RateLimitError, TimeoutError, AuthenticationError,
    InvalidResponseError, ProviderUnavailableError,
    ToolError, ToolNotFoundError, InvalidParametersError,
    ToolTimeoutError, ExternalAPIError,
    MemoryError, StorageQuotaExceeded, CorruptedMemoryEntry,
    EmbeddingGenerationError, SyncFailure,
    DocumentError, FileTooLargeError, UnsupportedFormatError,
    UploadFailureError, ConsentNotProvidedError, SubmissionFailureError,
    ValidationError, NetworkError, ConnectionError
)
from .error_handlers import (
    handle_llm_error,
    handle_tool_error,
    handle_memory_error,
    handle_document_error,
    validate_input,
    handle_generic_error
)

__all__ = [
    # Encryption
    "encrypt_data",
    "decrypt_data",
    # Logging
    "setup_logging",
    "get_logger",
    "setup_alert_service",
    "get_alert_service",
    "log_error",
    "determine_severity",
    "ErrorLog",
    "ErrorSeverity",
    "AlertService",
    # Exceptions
    "MagnaAIError",
    "LLMError",
    "RateLimitError",
    "TimeoutError",
    "AuthenticationError",
    "InvalidResponseError",
    "ProviderUnavailableError",
    "ToolError",
    "ToolNotFoundError",
    "InvalidParametersError",
    "ToolTimeoutError",
    "ExternalAPIError",
    "MemoryError",
    "StorageQuotaExceeded",
    "CorruptedMemoryEntry",
    "EmbeddingGenerationError",
    "SyncFailure",
    "DocumentError",
    "FileTooLargeError",
    "UnsupportedFormatError",
    "UploadFailureError",
    "ConsentNotProvidedError",
    "SubmissionFailureError",
    "ValidationError",
    "NetworkError",
    "ConnectionError",
    # Error Handlers
    "handle_llm_error",
    "handle_tool_error",
    "handle_memory_error",
    "handle_document_error",
    "validate_input",
    "handle_generic_error",
]
