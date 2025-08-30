/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { FileUploadSlots, FileUploadState } from "./file-upload.types";

/**
 * This function composes the final JSX of FileUpload
 */
export const renderFileUpload = (state: FileUploadState) => {
    assertSlots<FileUploadSlots>(state);

    return <state.root />;
};
