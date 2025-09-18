import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileUploadContentProps } from "./file-upload-content.types";
import { renderFileUploadContent } from "./render-file-upload-content";
import { useFileUploadContent } from "./use-file-upload-content";
import { useFileUploadContentStyles } from "./use-file-upload-content-styles";

/**
 * FileUploadContent component
 * Component to render a header and description in a FileUpload component.
 */
export const FileUploadContent: ForwardRefComponent<FileUploadContentProps> = React.forwardRef(
    (props, ref) => {
        const state = useFileUploadContent(props, ref);
        useFileUploadContentStyles(state);

        return renderFileUploadContent(state);
    }
);

FileUploadContent.displayName = "FileUploadContent";
