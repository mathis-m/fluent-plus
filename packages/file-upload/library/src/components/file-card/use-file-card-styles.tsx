import { tokens } from "@fluentui/react-components";
import type { ComponentState, SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { FileCardProps, FileCardSlots, FileCardState } from "./file-card.types";

export const fileCardClassNames: SlotClassNames<FileCardSlots> = {
    root: "fplus-FileCard",
    fileSize: "fplus-FileCard__fileSize",
    filename: "fplus-FileCard__fileName",
    thumbnail: "fplus-FileCard__thumbnail",
    removeButton: "fplus-FileCard__removeButton",
    contentBefore: "fplus-FileCard__contentBefore",
    contentAfter: "fplus-FileCard__contentAfter",
    cardHeader: "fplus-FileCard__cardHeader",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
    root: {},
    withBackground: {
        backgroundColor: tokens.colorNeutralBackground1,
    },
    fileName: {
        margin: 0,
    },
});

/**
 * Apply styling to the FileCard slots based on the state
 */
export const useFileCardStyles = (state: FileCardState): FileCardState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(
        fileCardClassNames.root,
        styles.root,
        state.uploadAppearance === "filled-alternative" && styles.withBackground,
        state.root.className
    );

    return state;
};

export const useHeaderStyles = (
    state: ComponentState<
        Pick<Required<FileCardProps>, "filename" | "fileSize" | "thumbnail" | "removeButton">
    >
) => {
    "use no memo";

    const styles = useStyles();

    state.filename.className = mergeClasses(fileCardClassNames.filename, styles.fileName);

    return state;
};
