import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileUploadProps } from "./file-upload.types";
import { renderFileUpload } from "./render-file-upload";
import { useFileUpload } from "./use-file-upload";
import { useFileUploadContextValue } from "./use-file-upload-context-value";
import { useFileUploadStyles } from "./use-file-upload-styles";

/**
 * FileUpload component to provide file upload capabilities with drag and drop support.
 */
export const FileUpload: ForwardRefComponent<FileUploadProps> = React.forwardRef((props, ref) => {
    const state = useFileUpload(props, ref);
    const contextValue = useFileUploadContextValue(state);

    useFileUploadStyles(state);

    return renderFileUpload(state, contextValue);
});

FileUpload.displayName = "FileUpload";
