/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { FileItemSlots, FileItemState } from "./file-item.types";

/**
 * This function composes the final JSX of FileItem
 */
export const renderFileItem = (state: FileItemState) => {
    assertSlots<FileItemSlots>(state);

    return <state.root />;
};
