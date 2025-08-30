import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { FileUploadSlots, FileUploadState } from "./file-upload.types";

export const fileUploadClassNames: SlotClassNames<FileUploadSlots> = {
    root: "fplus-FileUpload",
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
 * Apply styling to the FileUpload slots based on the state
 */
export const useFileUploadStyles = (state: FileUploadState): FileUploadState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(fileUploadClassNames.root, styles.root, state.root.className);

    return state;
};
