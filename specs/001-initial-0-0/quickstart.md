# Quick Start Guide: FluentPlus File Upload Components

**Package**: @fluent-plus/file-upload@0.0.1  
**Re-export**: @fluent-plus/react-components@0.0.1  
**Compatibility**: React 18+, Fluent UI v9

## Installation

### Option 1: Direct Package (Recommended)
```bash
npm install @fluent-plus/file-upload
# or
yarn add @fluent-plus/file-upload
# or
pnpm add @fluent-plus/file-upload
```

### Option 2: Convenience Re-export Package
```bash
npm install @fluent-plus/react-components
# or
yarn add @fluent-plus/react-components
# or
pnpm add @fluent-plus/react-components
```

## Peer Dependencies

Ensure you have the required peer dependencies:

```bash
npm install @fluentui/react-components react react-dom @fluent-ui/react-components
```

## Basic Usage

### 1. Import Components

```typescript
// Direct import (recommended for tree-shaking)
import { FileUpload, FileList, FileItem } from '@fluent-plus/file-upload';

// Or from convenience package
import { FileUpload, FileList, FileItem } from '@fluent-plus/react-components';
```

### 2. Simple File Upload

```typescript
import React, { useState } from 'react';
import { FileUpload, FileList, FileItem } from '@fluent-plus/file-upload';

function SimpleUploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <FileUpload onFilesAdded={handleFilesAdded}>
        Drag files here or click to browse
      </FileUpload>
      
      <FileList>
        {files.map((file, index) => (
          <FileItem
            key={index}
            status="pending"
            onRemove={() => handleRemoveFile(index)}
          >
            {{
              name: file.name,
              size: formatFileSize(file.size)
            }}
          </FileItem>
        ))}
      </FileList>
    </div>
  );
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
```

### 3. File Upload with Progress Tracking

```typescript
import React, { useState } from 'react';
import { FileUpload, FileList, FileItem } from '@fluent-plus/file-upload';

interface FileWithStatus {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  errorMessage?: string;
}

function UploadWithProgressExample() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    const filesWithStatus = newFiles.map(file => ({
      file,
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...filesWithStatus]);
  };

  const simulateUpload = async (index: number) => {
    // Update status to uploading
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, status: 'uploading' as const, progress: 0 } : f
    ));

    // Simulate progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, progress } : f
      ));
    }

    // Mark as complete
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, status: 'success' as const, progress: 100 } : f
    ));
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <FileUpload 
        onFilesAdded={handleFilesAdded}
        accept="image/*,.pdf,.doc,.docx"
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
      />
      
      <FileList>
        {files.map((fileItem, index) => (
          <FileItem
            key={index}
            status={fileItem.status}
            onRemove={() => handleRemoveFile(index)}
          >
            {{
              name: fileItem.file.name,
              size: formatFileSize(fileItem.file.size),
              ...(fileItem.status === 'error' && { errorMessage: fileItem.errorMessage }),
              ...(fileItem.status === 'pending' && {
                actions: (
                  <button onClick={() => simulateUpload(index)}>
                    Start Upload
                  </button>
                )
              })
            }}
          </FileItem>
        ))}
      </FileList>
    </div>
  );
}
```

## Advanced Usage

### Custom Upload Area with Slots

```typescript
import { Button, Text, Label } from '@fluentui/react-components';

function CustomUploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload onFilesAdded={handleFilesAdded}>
      {{
        label: <Label size="large">Upload Documents</Label>,
        description: (
          <Text size={300}>
            Drag and drop files here, or click the button below to browse.
            Supported formats: PDF, DOC, DOCX (max 10MB each)
          </Text>
        ),
        trigger: <Button appearance="primary">Choose Files</Button>
      }}
    </FileUpload>
  );
}
```

### Semantic File List

```typescript
function SemanticListExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <FileUpload onFilesAdded={setFiles} />
      
      <FileList as="ul" role="list">
        {files.map((file, index) => (
          <FileItem
            key={index}
            status="success"
          >
            {{
              name: file.name,
              size: formatFileSize(file.size),
              beforeContent: <FileIcon type={file.type} />,
              afterContent: <Text size={200}>Uploaded just now</Text>
            }}
          </FileItem>
        ))}
      </FileList>
    </div>
  );
}
```

### Error Handling

```typescript
function ErrorHandlingExample() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    const filesWithStatus = newFiles.map(file => {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return {
          file,
          status: 'error' as const,
          errorMessage: 'File size exceeds 5MB limit'
        };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          file,
          status: 'error' as const,
          errorMessage: 'Only image files are allowed'
        };
      }

      return {
        file,
        status: 'pending' as const
      };
    });

    setFiles(prev => [...prev, ...filesWithStatus]);
  };

  return (
    <div>
      <FileUpload 
        onFilesAdded={handleFilesAdded}
        maxSize={5 * 1024 * 1024}
      />
      
      <FileList>
        {files.map((fileItem, index) => (
          <FileItem
            key={index}
            status={fileItem.status}
            onRemove={() => handleRemoveFile(index)}
          >
            {{
              name: fileItem.file.name,
              size: formatFileSize(fileItem.file.size),
              ...(fileItem.status === 'error' && { errorMessage: fileItem.errorMessage })
            }}
          </FileItem>
        ))}
      </FileList>
    </div>
  );
}
```

## TypeScript Support

The library includes comprehensive TypeScript definitions:

```typescript
import type { 
  FileUploadProps, 
  FileListProps, 
  FileItemProps 
} from '@fluent-plus/file-upload';

// Type-safe component usage
const MyUpload: React.FC<FileUploadProps> = (props) => {
  return <FileUpload {...props} />;
};
```

## Accessibility Features

All components include built-in accessibility features:

- **Keyboard Navigation**: Tab, Enter, and Space key support
- **Screen Reader Support**: ARIA labels and live regions
- **High Contrast Mode**: Automatic compatibility
- **Focus Management**: Clear focus indicators

## Integration with Fluent UI v9

Components automatically integrate with your Fluent UI v9 theme:

```typescript
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <FileUpload onFilesAdded={handleFiles} />
      {/* Components automatically use theme tokens */}
    </FluentProvider>
  );
}
```

## Common Patterns

### File Upload with Real Backend

```typescript
async function uploadToServer(file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }
}

function RealUploadExample() {
  // Implementation with actual server upload
  // See full example in documentation
}
```

### Drag and Drop with Visual Feedback

```typescript
function VisualFeedbackExample() {
  return (
    <FileUpload onFilesAdded={handleFiles}>
      {({ isDragActive, isDragAccept, isDragReject }) => (
        <div 
          style={{
            border: `2px dashed ${
              isDragReject ? 'red' : 
              isDragAccept ? 'green' : 
              isDragActive ? 'blue' : 'gray'
            }`,
            padding: '20px',
            textAlign: 'center'
          }}
        >
          {isDragReject && 'Invalid file type!'}
          {isDragAccept && 'Drop files here'}
          {!isDragActive && 'Drag files here or click to browse'}
        </div>
      )}
    </FileUpload>
  );
}
```

## Next Steps

- Explore the [full documentation](./README.md) for advanced features
- Check out [Storybook examples](./storybook) for interactive demos
- Review [component contracts](./contracts/) for detailed API reference
- See [integration examples](./examples/) for real-world usage patterns

## Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and API reference
- **TypeScript**: Full type support for development experience
- **Accessibility**: WCAG 2.1 AA compliant components