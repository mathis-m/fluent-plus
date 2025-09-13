/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { FileListSlots, FileListState } from "./file-list.types";

/**
 * This function composes the final JSX of FileList
 */
export const renderFileList = (state: FileListState) => {
    assertSlots<FileListSlots>(state);

    return <state.root />;
};
