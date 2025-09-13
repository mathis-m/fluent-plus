import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { FileListSlots, FileListState } from "./file-list.types";

export const fileListClassNames: SlotClassNames<FileListSlots> = {
    root: "fplus-FileList",
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
 * Apply styling to the FileList slots based on the state
 */
export const useFileListStyles = (state: FileListState): FileListState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(fileListClassNames.root, styles.root, state.root.className);

    return state;
};
