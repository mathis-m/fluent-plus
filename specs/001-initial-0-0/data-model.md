# Data Model: FluentPlus File Upload Components

**Date**: September 6, 2025  
**Feature**: Initial 0.0.1 Release - FluentPlus File Upload Core Components

## Entity Definitions

### File Entity

**Purpose**: Represents an individual file with all relevant metadata and state information

**Fields**:
```typescript
interface FileEntity {
  // Core file properties
  id: string;                          // Unique identifier for the file
  name: string;                        // Original filename with extension
  size: number;                        // File size in bytes
  type: string;                        // MIME type (e.g., 'image/jpeg', 'application/pdf')
  lastModified?: Date;                 // File last modified date (when available)
  
  // Upload state properties
  status: FileStatus;                  // Current upload status
  progress?: number;                   // Upload progress (0-100)
  error?: string;                      // Error message if upload failed
  
  // Native file reference
  file: File;                          // Reference to the native File object
  
  // Optional metadata
  preview?: string;                    // Data URL for image previews
  tags?: string[];                     // Custom tags for categorization
  metadata?: Record<string, any>;      // Additional custom metadata
}

enum FileStatus {
  PENDING = 'pending',                 // File selected but not yet uploaded
  UPLOADING = 'uploading',             // File currently being uploaded
  COMPLETED = 'completed',             // Upload successfully completed
  FAILED = 'failed',                   // Upload failed with error
  CANCELLED = 'cancelled',             // Upload was cancelled by user
  VALIDATING = 'validating',           // File being validated
  INVALID = 'invalid'                  // File failed validation
}
```

**Validation Rules**:
- `id` must be unique within the file collection
- `name` must not be empty string
- `size` must be non-negative number
- `type` should be valid MIME type format
- `progress` when present must be between 0-100
- `status` must be valid FileStatus enum value
- `file` must be valid File object reference

**State Transitions**:
```
PENDING → VALIDATING → {INVALID | UPLOADING}
UPLOADING → {COMPLETED | FAILED | CANCELLED}
FAILED → UPLOADING (retry)
CANCELLED → UPLOADING (retry)
```

### FileUpload State

**Purpose**: Manages the upload component state and user interactions

**Fields**:
```typescript
interface FileUploadState {
  // File management
  files: FileEntity[];                 // Collection of selected files
  selectedFileIds: string[];           // Currently selected file IDs
  
  // UI state
  isDragActive: boolean;               // Drag-and-drop active state
  isUploading: boolean;                // Any files currently uploading
  isDisabled: boolean;                 // Component disabled state
  
  // Validation and constraints
  acceptedFileTypes: string[];         // Accepted MIME types or extensions
  maxFileSize: number;                 // Maximum file size in bytes
  maxFiles: number;                    // Maximum number of files
  
  // Error handling
  globalErrors: string[];              // Component-level error messages
  
  // Upload orchestration
  concurrentUploads: number;           // Number of simultaneous uploads
  queuedFiles: string[];               // File IDs waiting to upload
  
  // Callbacks and handlers
  onFilesChange?: (files: FileEntity[]) => void;
  onFileAdd?: (files: FileEntity[]) => void;
  onFileRemove?: (fileId: string) => void;
  onUploadStart?: (fileId: string) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  onUploadComplete?: (fileId: string) => void;
  onUploadError?: (fileId: string, error: string) => void;
}
```

**Validation Rules**:
- `files` array should not exceed `maxFiles` limit
- Each file in `files` should not exceed `maxFileSize`
- `selectedFileIds` must reference valid file IDs in `files` array
- `concurrentUploads` must be positive number
- `acceptedFileTypes` should contain valid MIME types or file extensions

### Upload Progress Tracking

**Purpose**: Tracks detailed progress information for uploads

**Fields**:
```typescript
interface UploadProgress {
  fileId: string;                      // Reference to file being uploaded
  
  // Progress metrics
  bytesUploaded: number;               // Bytes successfully uploaded
  totalBytes: number;                  // Total file size in bytes
  percentage: number;                  // Upload percentage (0-100)
  
  // Timing information
  startTime: Date;                     // Upload start timestamp
  estimatedCompletionTime?: Date;      // Estimated completion time
  uploadSpeed?: number;                // Current upload speed (bytes/sec)
  
  // Status tracking
  status: FileStatus;                  // Current upload status
  retryCount: number;                  // Number of retry attempts
  lastError?: string;                  // Most recent error message
  
  // Upload metadata
  chunkIndex?: number;                 // Current chunk (for chunked uploads)
  totalChunks?: number;                // Total chunks (for chunked uploads)
  uploadUrl?: string;                  // Upload endpoint URL
  uploadMethod?: 'POST' | 'PUT';       // HTTP method used
}
```

**Validation Rules**:
- `bytesUploaded` should not exceed `totalBytes`
- `percentage` should match calculated value from bytes
- `retryCount` should be non-negative
- `startTime` should not be in the future
- `uploadSpeed` when present should be non-negative

### Validation Error Details

**Purpose**: Detailed validation error information for files

**Fields**:
```typescript
interface ValidationError {
  fileId: string;                      // Reference to file with error
  code: ValidationErrorCode;           // Error type code
  message: string;                     // Human-readable error message
  field?: string;                      // Specific field that failed validation
  expectedValue?: any;                 // Expected value for validation
  actualValue?: any;                   // Actual value that failed
  severity: 'error' | 'warning';       // Error severity level
}

enum ValidationErrorCode {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  TOO_MANY_FILES = 'TOO_MANY_FILES',
  DUPLICATE_FILE = 'DUPLICATE_FILE',
  EMPTY_FILE = 'EMPTY_FILE',
  CORRUPTED_FILE = 'CORRUPTED_FILE',
  CUSTOM_VALIDATION_FAILED = 'CUSTOM_VALIDATION_FAILED'
}
```

## Entity Relationships

### File Lifecycle Flow
```
User Selection → FileEntity (PENDING) → Validation → {INVALID | Upload Queue}
Upload Queue → FileEntity (UPLOADING) → Progress Tracking → {COMPLETED | FAILED}
Failed Files → Retry Queue → FileEntity (UPLOADING)
```

### State Dependencies
- FileUploadState contains collection of FileEntity objects
- UploadProgress maps 1:1 with FileEntity during upload
- ValidationError references FileEntity by ID
- File status transitions trigger state updates in FileUploadState

### Component Data Flow
```
FileUpload Component:
  - Manages FileUploadState
  - Handles file selection and drag-and-drop
  - Coordinates with upload orchestration

FileList Component:
  - Receives FileEntity[] array
  - No internal state management
  - Pure display component

FileItem Component:
  - Receives single FileEntity
  - Optional UploadProgress for progress display
  - Optional ValidationError for error display
  - Minimal local UI state only
```

## Data Validation Strategy

### Client-Side Validation
- File type validation using MIME type and extension checking
- File size validation against configured limits
- File count validation against maximum limits
- Duplicate detection using file name and size comparison
- Custom validation rules through plugin hooks

### Validation Timing
- Immediate validation on file selection
- Pre-upload validation before adding to upload queue
- Progressive validation during upload process
- Post-upload validation for server-side errors

### Error Handling Strategy
- Individual file errors stored in FileEntity.error
- Global component errors in FileUploadState.globalErrors
- Detailed validation errors in ValidationError entities
- User-friendly error messages with actionable guidance

## Performance Considerations

### Memory Management
- File objects are references to native File API objects
- Large file previews are generated on-demand only
- File metadata is minimal to reduce memory footprint
- Cleanup of completed/failed uploads to prevent memory leaks

### State Updates
- Immutable state updates to enable React optimization
- Selective re-rendering based on changed file IDs only
- Batched state updates for multiple file operations
- Efficient comparison for file list updates

### Scalability
- Support for large file collections (1000+ files)
- Virtualization-friendly data structure
- Efficient filtering and sorting operations
- Minimal state for display-only components (FileList, FileItem)

## Future Extensibility

### Additional Entity Properties
- Server-side file IDs after upload completion
- Upload session tokens for resumable uploads
- Custom metadata fields for business-specific data
- Relationship links between related files

### Enhanced State Management
- Undo/redo capabilities for file operations
- History tracking for upload sessions
- Persistence layer for draft file collections
- Synchronization with server-side state

### Advanced Validation
- Asynchronous validation with server-side checks
- Content-based validation (virus scanning, content analysis)
- Business rule validation through plugin architecture
- Multi-stage validation pipelines