import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileUploadProps } from "./file-upload.types";
import { renderFileUpload } from "./render-file-upload";
import { useFileUpload } from "./use-file-upload";
import { useFileUploadStyles } from "./use-file-upload-styles";

/**
 * FileUpload component
 * TODO: add description
 */
export const FileUpload: ForwardRefComponent<FileUploadProps> = React.forwardRef((props, ref) => {
    const state = useFileUpload(props, ref);
    useFileUploadStyles(state);

    return renderFileUpload(state);
});

FileUpload.displayName = "FileUpload";
