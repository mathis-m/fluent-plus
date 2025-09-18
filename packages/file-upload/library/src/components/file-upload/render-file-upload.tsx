/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import { FileUploadContextProvider, FileUploadContextValue } from "../../contexts/file-upload-context";
import type { FileUploadSlots, FileUploadState } from "./file-upload.types";

/**
 * This function composes the final JSX of FileUpload
 */
export const renderFileUpload = (state: FileUploadState, contextValue: FileUploadContextValue) => {
    assertSlots<FileUploadSlots>(state);

    return (
        <FileUploadContextProvider value={contextValue}>
            <state.root>
                {state.children}
                {state.input && <state.input />}
            </state.root>
        </FileUploadContextProvider>
    );
};
