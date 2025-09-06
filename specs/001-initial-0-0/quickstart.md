# QuickStart Guide: FluentPlus File Upload Components

**Version**: 0.0.1  
**Date**: September 6, 2025  
**Prerequisites**: React 18+, Fluent UI v9 setup in your application

## Installation

```bash
# Install the file upload component package
npm install @fluent-plus/file-upload

# Or install the convenience re-export package
npm install @fluent-plus/react-components

# Ensure peer dependencies are installed
npm install @fluentui/react-components react react-dom
```

## Basic Usage

### 1. Simple File Upload with All Components

```tsx
import React, { useState } from 'react';
import { FileUpload, FileList, FileItem, FileEntity } from '@fluent-plus/file-upload';

function App() {
  const [files, setFiles] = useState<FileEntity[]>([]);

  return (
    <div>
      <FileUpload
        files={files}
        onFilesChange={setFiles}
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
        accept="image/*,.pdf"
        label="Upload your documents"
        description="Drag files here or click to browse - Max 10MB - Images and PDFs only"
      >
        <FileList files={files}>
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              removable
              onRemove={(fileId) => 
                setFiles(files.filter(f => f.id !== fileId))
              }
            />
          ))}
        </FileList>
      </FileUpload>
    </div>
  );
}
```

### 2. Standalone FileUpload (Custom File Display)

```tsx
import React, { useState } from 'react';
import { FileUpload, FileEntity } from '@fluent-plus/file-upload';

function CustomFileUpload() {
  const [files, setFiles] = useState<FileEntity[]>([]);

  return (
    <div>
      <FileUpload
        files={files}
        onFilesChange={setFiles}
        multiple
        label="Upload Files"
      />
      
      {/* Custom file display */}
      <div style={{ marginTop: '16px' }}>
        {files.map((file) => (
          <div key={file.id} style={{ padding: '8px', border: '1px solid #ccc' }}>
            <strong>{file.name}</strong> ({file.size} bytes)
            <button onClick={() => setFiles(files.filter(f => f.id !== file.id))}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Independent FileItem Usage

```tsx
import React from 'react';
import { FileItem, FileEntity, FileStatus } from '@fluent-plus/file-upload';

function FileDisplay({ file }: { file: FileEntity }) {
  return (
    <FileItem
      file={file}
      variant="detailed"
      beforeContent={<img src={file.preview} alt="Preview" width="40" height="40" />}
      afterContent={<span>Modified: {file.lastModified?.toDateString()}</span>}
      actions={
        <div>
          <button>Download</button>
          <button>Share</button>
        </div>
      }
    />
  );
}
```

## Advanced Usage with Simple Hooks

### 4. Using Component Hooks for Enhanced Functionality

```tsx
import React from 'react';
import { 
  FileUpload, 
  FileList, 
  FileItem,
  useFileUpload
} from '@fluent-plus/file-upload';

function AdvancedFileUpload() {
  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
    hasFiles,
    validateFile,
    errors
  } = useFileUpload({
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/*,.pdf,.docx',
    onFileAdd: (newFiles) => {
      console.log('Files added:', newFiles);
    },
    onFileRemove: (fileId) => {
      console.log('File removed:', fileId);
    },
    onValidationError: (errors) => {
      console.log('Validation errors:', errors);
    }
  });

  const handleFilesChange = (newFiles: File[]) => {
    addFiles(newFiles);
  };

  return (
    <div>
      <FileUpload
        files={files.map(f => f.file)}
        onFilesChange={handleFilesChange}
        label="Advanced Upload"
        description={`${files.length} files selected`}
      >
        <FileList files={files}>
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              removable
              onRemove={removeFile}
            />
          ))}
        </FileList>
      </FileUpload>
      
      {errors.length > 0 && (
        <div style={{ marginTop: '8px', color: 'red' }}>
          {errors.map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '16px' }}>
        <button onClick={clearFiles} disabled={!hasFiles}>
          Clear All Files
        </button>
      </div>
    </div>
  );
}
```

## Customization Examples

### 5. Custom Slots and Styling

```tsx
import React from 'react';
import { FileUpload, makeStyles } from '@fluent-plus/file-upload';

const useStyles = makeStyles({
  customDropzone: {
    border: '2px dashed #0078d4',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f3f2f1',
    '&:hover': {
      backgroundColor: '#edebe9'
    }
  },
  customTrigger: {
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
});

function CustomStyledUpload() {
  const styles = useStyles();

  return (
    <FileUpload
      multiple
      dropzone={{ className: styles.customDropzone }}
      trigger={{ 
        className: styles.customTrigger,
        children: 'Browse Files'
      }}
    />
  );
}
```

### 6. Accessibility-Enhanced Components

```tsx
import React from 'react';
import { FileUpload, FileList, FileItem } from '@fluent-plus/file-upload';

function AccessibleFileUpload() {
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [announcements, setAnnouncements] = useState<string>('');

  return (
    <div>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {announcements}
      </div>

      <FileUpload
        files={files}
        onFilesChange={setFiles}
        aria-label="File upload area"
        aria-describedby="upload-description"
        onFileAdd={(newFiles) => {
          setAnnouncements(`${newFiles.length} files added to upload queue`);
        }}
        label="Upload Documents"
        description={
          <span id="upload-description">
            Select files by dragging and dropping or clicking the browse button. 
            Maximum 5 files, 10MB each.
          </span>
        }
      >
        <FileList 
          files={files}
          aria-label={`File list with ${files.length} files`}
          role="listbox"
        >
          {files.map((file, index) => (
            <FileItem
              key={file.id}
              file={file}
              aria-label={`File ${index + 1}: ${file.name}, ${file.size} bytes`}
              role="option"
              removable
              onRemove={(fileId) => {
                setFiles(files.filter(f => f.id !== fileId));
                setAnnouncements(`File ${file.name} removed from upload queue`);
              }}
            />
          ))}
        </FileList>
      </FileUpload>
    </div>
  );
}
```

## Integration Patterns

### 7. Form Integration

```tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FileUpload, FileEntity } from '@fluent-plus/file-upload';

interface FormData {
  title: string;
  description: string;
  attachments: FileEntity[];
}

function FormWithFileUpload() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission including file uploads
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <input {...field} type="text" />
          )}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <Controller
          name="attachments"
          control={control}
          rules={{ 
            validate: (files) => files.length > 0 || 'At least one file is required'
          }}
          render={({ field: { onChange, value = [] } }) => (
            <FileUpload
              files={value}
              onFilesChange={onChange}
              label="Attachments"
              maxFiles={3}
            />
          )}
        />
        {errors.attachments && <span>{errors.attachments.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### 8. Server Upload Integration

```tsx
import React from 'react';
import { 
  FileUpload, 
  FileList, 
  FileItem,
  useFileUploadOrchestration 
} from '@fluent-plus/file-upload';

function ServerIntegratedUpload() {
  const [files, setFiles] = useState<FileEntity[]>([]);

  const orchestration = useFileUploadOrchestration({
    concurrent: 2,
    retryAttempts: 3,
    uploadFunction: async (file, onProgress) => {
      const formData = new FormData();
      formData.append('file', file);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress?.(progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error'));

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });
    },
    onUploadComplete: (fileId) => {
      console.log('Upload completed for file:', fileId);
    },
    onUploadError: (fileId, error) => {
      console.error('Upload failed for file:', fileId, error);
    }
  });

  return (
    <div>
      <FileUpload
        files={files}
        onFilesChange={setFiles}
        label="Upload to Server"
      >
        <FileList files={files}>
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              progress={orchestration.getProgress(file.id)?.percentage}
              removable
              onRemove={(fileId) => setFiles(files.filter(f => f.id !== fileId))}
            />
          ))}
        </FileList>
      </FileUpload>

      <button 
        onClick={() => orchestration.uploadAll()}
        disabled={files.length === 0}
      >
        Upload All to Server
      </button>
    </div>
  );
}
```

## Testing Examples

### 9. Component Testing

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload, FileList, FileItem } from '@fluent-plus/file-upload';

describe('FileUpload Integration', () => {
  test('should handle file selection and display', async () => {
    const user = userEvent.setup();
    const onFilesChange = jest.fn();

    render(
      <FileUpload onFilesChange={onFilesChange} label="Upload Files">
        <FileList files={[]}>
          {/* Files will be rendered here */}
        </FileList>
      </FileUpload>
    );

    // Test drag and drop
    const dropzone = screen.getByLabelText('Upload Files');
    
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    
    await user.upload(dropzone, file);
    
    await waitFor(() => {
      expect(onFilesChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'test.txt',
            size: 7,
            type: 'text/plain'
          })
        ])
      );
    });
  });

  test('should validate file constraints', async () => {
    const onValidationError = jest.fn();

    render(
      <FileUpload
        maxSize={1024}
        accept="image/*"
        onValidationError={onValidationError}
        label="Images Only"
      />
    );

    const dropzone = screen.getByLabelText('Images Only');
    const largeFile = new File(['x'.repeat(2048)], 'large.txt', { type: 'text/plain' });

    await userEvent.upload(dropzone, largeFile);

    await waitFor(() => {
      expect(onValidationError).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'FILE_TOO_LARGE'
          })
        ])
      );
    });
  });
});
```

## Troubleshooting

### Common Issues

1. **Files not appearing after selection**
   - Ensure `onFilesChange` callback is properly implemented
   - Check if file validation is rejecting files
   - Verify file constraints (size, type, count limits)

2. **Drag and drop not working**
   - Ensure react-dropzone is properly installed
   - Check if dropzone element has proper event handlers
   - Verify browser drag-and-drop support

3. **Accessibility issues**
   - Add proper `aria-label` attributes
   - Ensure keyboard navigation works
   - Test with screen readers

4. **TypeScript errors**
   - Install `@types/react` and `@types/react-dom`
   - Ensure Fluent UI v9 types are installed
   - Check peer dependency versions

### Performance Optimization

1. **Large file lists**
   - Use `virtualized` prop on FileList for 100+ files
   - Implement file filtering and pagination
   - Consider lazy loading for file previews

2. **Memory management**
   - Clear file references after upload completion
   - Avoid storing large file objects in state
   - Use file IDs for tracking instead of full objects

### Browser Compatibility

- **Modern browsers**: Full support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Older browsers**: Basic functionality with polyfills
- **Mobile browsers**: Touch-friendly drag-and-drop support

## Next Steps

1. **Explore advanced features**: Try the feature composition hooks for complex scenarios
2. **Customize styling**: Use Fluent UI v9 design tokens for consistent theming
3. **Add server integration**: Implement your upload backend service
4. **Enhance accessibility**: Add custom announcements and keyboard shortcuts
5. **Performance tuning**: Optimize for your specific use case and file volumes

For more detailed documentation and examples, visit the [FluentPlus Storybook documentation](https://mathis-m.github.io/fluent-plus/).