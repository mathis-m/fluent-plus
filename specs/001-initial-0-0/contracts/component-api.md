# Component API Contracts

## FileUpload Component Contract

### Props Interface
```typescript
interface FileUploadProps {
  // Core functionality
  files?: FileEntity[];                          // Controlled mode: current files
  defaultFiles?: FileEntity[];                   // Uncontrolled mode: initial files
  onFilesChange?: (files: FileEntity[]) => void; // File collection change callback
  
  // File constraints
  accept?: string;                               // Accepted file types (MIME types or extensions)
  maxSize?: number;                              // Maximum file size in bytes
  maxFiles?: number;                             // Maximum number of files
  
  // Upload configuration
  multiple?: boolean;                            // Allow multiple file selection
  disabled?: boolean;                           // Disable component
  
  // Validation
  validator?: (file: File) => ValidationError | null;
  
  // Callbacks
  onFileAdd?: (files: FileEntity[]) => void;
  onFileRemove?: (fileId: string) => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: FileEntity[]) => void;
  
  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  
  // Slots for customization
  label?: React.ReactNode;
  description?: React.ReactNode;
  dropzone?: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}
```

### Slots Definition
```typescript
interface FileUploadSlots {
  root: ComponentProps<'div'>;                   // Main container
  label: ComponentProps<'span'>;                 // Primary label text
  description: ComponentProps<'span'>;           // Helper/description text
  dropzone: ComponentProps<'div'>;               // Drag-and-drop area
  trigger: ComponentProps<'button'>;             // Browse button
  input: ComponentProps<'input'>;                // Hidden file input
}
```

### State Interface
```typescript
interface FileUploadState {
  files: FileEntity[];
  isDragActive: boolean;
  isDisabled: boolean;
  errors: ValidationError[];
  
  // Computed properties
  hasFiles: boolean;
  canAddFiles: boolean;
  acceptedFiles: FileEntity[];
  rejectedFiles: FileEntity[];
}
```

## FileList Component Contract

### Props Interface
```typescript
interface FileListProps {
  // Core data
  files: FileEntity[];                          // Required: files to display
  
  // Display options
  variant?: 'default' | 'compact' | 'detailed'; // Display variant
  layout?: 'list' | 'grid';                    // Layout type
  
  // Selection
  selectable?: boolean;                         // Enable file selection
  selectedFileIds?: string[];                   // Controlled selection
  onSelectionChange?: (fileIds: string[]) => void;
  
  // Sorting
  sortBy?: 'name' | 'size' | 'date' | 'status'; // Sort field
  sortDirection?: 'asc' | 'desc';               // Sort direction
  onSortChange?: (sortBy: string, direction: string) => void;
  
  // Filtering
  filter?: (file: FileEntity) => boolean;       // Filter function
  
  // Item rendering
  renderItem?: (file: FileEntity, index: number) => React.ReactNode;
  
  // Accessibility
  'aria-label'?: string;
  role?: string;
  
  // Virtualization support
  virtualized?: boolean;
  itemHeight?: number;
  maxHeight?: number;
}
```

### Slots Definition
```typescript
interface FileListSlots {
  root: ComponentProps<'div' | 'ul'>;           // Container element
}
```

### State Interface
```typescript
interface FileListState {
  files: FileEntity[];
  selectedFileIds: string[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  
  // Computed properties
  sortedFiles: FileEntity[];
  filteredFiles: FileEntity[];
  hasSelection: boolean;
  selectedFiles: FileEntity[];
}
```

## FileItem Component Contract

### Props Interface
```typescript
interface FileItemProps {
  // Core data (required)
  file: FileEntity;                             // File to display
  
  // Display options
  variant?: 'default' | 'compact' | 'detailed'; // Display variant
  
  // State indicators
  progress?: number;                            // Upload progress (0-100)
  status?: FileStatus;                          // Override file status
  error?: string;                               // Override error message
  
  // Actions
  removable?: boolean;                          // Show remove button
  onRemove?: (fileId: string) => void;         // Remove callback
  
  // Custom actions
  actions?: React.ReactNode;                    // Custom action buttons
  
  // Content customization
  beforeContent?: React.ReactNode;              // Content before file info
  afterContent?: React.ReactNode;               // Content after file info
  
  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  
  // Selection
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (fileId: string, selected: boolean) => void;
}
```

### Slots Definition
```typescript
interface FileItemSlots {
  root: ComponentProps<'div' | 'li'>;           // Item container
  beforeContent: ComponentProps<'div'>;         // Before content area
  status: ComponentProps<'span'>;               // Status indicator
  content: ComponentProps<'div'>;               // Main content area
  name: ComponentProps<'span'>;                 // File name
  size: ComponentProps<'span'>;                 // File size
  errorMessage: ComponentProps<'span'>;         // Error message
  progressIndicator: ComponentProps<'div'>;     // Progress indicator
  actions: ComponentProps<'div'>;               // Actions container
  removeButton: ComponentProps<'button'>;       // Remove button
  afterContent: ComponentProps<'div'>;          // After content area
}
```

### State Interface
```typescript
interface FileItemState {
  file: FileEntity;
  progress: number;
  status: FileStatus;
  error?: string;
  selected: boolean;
  
  // Computed properties
  isUploading: boolean;
  hasError: boolean;
  isCompleted: boolean;
  canRemove: boolean;
  formattedSize: string;
  statusText: string;
}
```

## Hook Contracts

### Basic Component Hooks

Each component may have a simple state management hook following Fluent UI v9 patterns:

#### useFileUpload Hook (for FileUpload component)
```typescript
interface UseFileUploadOptions {
  // Core configuration
  defaultFiles?: File[];
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  
  // Callbacks
  onFilesChange?: (files: File[]) => void;
  onFileAdd?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  onValidationError?: (errors: ValidationError[]) => void;
}

interface UseFileUploadReturn {
  // Core state
  files: FileEntity[];
  errors: ValidationError[];
  isDragActive: boolean;
  
  // Actions
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  
  // Utilities
  validateFile: (file: File) => ValidationError | null;
  
  // Computed state
  hasFiles: boolean;
  hasErrors: boolean;
  canAddFiles: boolean;
}
```

#### useFileList Hook (for FileList component)
```typescript
interface UseFileListOptions {
  files: FileEntity[];
  selectable?: boolean;
  sortBy?: 'name' | 'size' | 'date' | 'status';
  sortDirection?: 'asc' | 'desc';
  filter?: (file: FileEntity) => boolean;
}

interface UseFileListReturn {
  sortedFiles: FileEntity[];
  filteredFiles: FileEntity[];
  selectedFileIds: string[];
  
  // Actions
  toggleSelection: (fileId: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  updateSort: (field: string, direction: 'asc' | 'desc') => void;
}
```

#### useFileItem Hook (for FileItem component)
```typescript
interface UseFileItemOptions {
  file: FileEntity;
  selectable?: boolean;
  removable?: boolean;
}

interface UseFileItemReturn {
  // Computed state
  isUploading: boolean;
  hasError: boolean;
  isCompleted: boolean;
  formattedSize: string;
  statusText: string;
  
  // Actions
  toggleSelection: () => void;
  remove: () => void;
}
```

## Event Interfaces

### File Events
```typescript
interface FileAddEvent {
  files: FileEntity[];
  source: 'drop' | 'browse' | 'paste';
  timestamp: Date;
}

interface FileRemoveEvent {
  fileId: string;
  file: FileEntity;
  timestamp: Date;
}

interface FileValidationEvent {
  fileId: string;
  file: FileEntity;
  errors: ValidationError[];
  timestamp: Date;
}
```

### Upload Events
```typescript
interface UploadStartEvent {
  fileId: string;
  file: FileEntity;
  timestamp: Date;
}

interface UploadProgressEvent {
  fileId: string;
  file: FileEntity;
  progress: number;
  bytesUploaded: number;
  totalBytes: number;
  timestamp: Date;
}

interface UploadCompleteEvent {
  fileId: string;
  file: FileEntity;
  duration: number;
  timestamp: Date;
}

interface UploadErrorEvent {
  fileId: string;
  file: FileEntity;
  error: string;
  retryCount: number;
  timestamp: Date;
}
```

## Accessibility Contracts

### ARIA Requirements
```typescript
interface AccessibilityProps {
  // Required ARIA labels
  'aria-label': string;                         // Component description
  'aria-describedby'?: string;                  // Additional description
  
  // Role definitions
  role?: 'button' | 'listbox' | 'option';       // Semantic role
  
  // State announcements
  'aria-live'?: 'polite' | 'assertive';         // Live region updates
  'aria-expanded'?: boolean;                    // Expansion state
  'aria-selected'?: boolean;                    // Selection state
  'aria-invalid'?: boolean;                     // Validation state
  
  // Relationships
  'aria-labelledby'?: string;                   // Label reference
  'aria-owns'?: string;                         // Ownership relationships
}
```

### Keyboard Navigation Contract
```typescript
interface KeyboardBehavior {
  // Focus management
  focusable: boolean;
  tabIndex: number;
  autoFocus?: boolean;
  
  // Key handlers
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  
  // Supported keys
  supportedKeys: ('Enter' | 'Space' | 'Escape' | 'ArrowUp' | 'ArrowDown' | 'Delete')[];
}
```

## Error Handling Contracts

### Error Boundary Interface
```typescript
interface FileUploadErrorBoundary {
  fallback: (error: Error, errorInfo: ErrorInfo) => React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}
```

### Error Recovery Contract
```typescript
interface ErrorRecovery {
  retryableErrors: ValidationErrorCode[];
  maxRetryAttempts: number;
  retryDelay: number;
  
  retry: (fileId: string) => Promise<void>;
  canRetry: (error: ValidationError) => boolean;
  getRetryCount: (fileId: string) => number;
}