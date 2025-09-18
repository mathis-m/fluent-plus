/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { FileCardSlots, FileCardState } from "./file-card.types";

/**
 * This function composes the final JSX of FileCard
 */
export const renderFileCard = (state: FileCardState) => {
    assertSlots<FileCardSlots>(state);

    return (
        <state.root>
            {state.contentBefore && <state.contentBefore />}
            <state.cardHeader />
            {state.children}
            {state.contentAfter && <state.contentAfter />}
        </state.root>
    );
};
