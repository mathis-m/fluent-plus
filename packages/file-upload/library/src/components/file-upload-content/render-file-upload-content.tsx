/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { FileUploadContentSlots, FileUploadContentState } from "./file-upload-content.types";

/**
 * This function composes the final JSX of FileUploadContent
 */
export const renderFileUploadContent = (state: FileUploadContentState) => {
    assertSlots<FileUploadContentSlots>(state);

    return (
        <state.root>
            {state.image && <state.image />}
            <state.informationContainer>
                {state.header && <state.header />}
                {state.description && <state.description />}
            </state.informationContainer>
            {state.selectFilesButton && <state.selectFilesButton />}
        </state.root>
    );
};
