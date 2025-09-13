import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { FileItemSlots, FileItemState } from "./file-item.types";

export const fileItemClassNames: SlotClassNames<FileItemSlots> = {
    root: "fplus-FileItem",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
    root: {
        // TODO: Add styles for the root element
    },
});

/**
 * Apply styling to the FileItem slots based on the state
 */
export const useFileItemStyles = (state: FileItemState): FileItemState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(fileItemClassNames.root, styles.root, state.root.className);

    return state;
};
