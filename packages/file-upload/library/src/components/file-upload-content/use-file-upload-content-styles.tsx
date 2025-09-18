import { tokens } from "@fluentui/react-components";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeResetStyles, makeStyles, mergeClasses } from "@griffel/react";
import type { FileUploadContentSlots, FileUploadContentState } from "./file-upload-content.types";

export const fileUploadContentClassNames: SlotClassNames<FileUploadContentSlots> = {
    root: "fplus-FileUploadContent",
    image: "fplus-FileUploadContent__image",
    informationContainer: "fplus-FileUploadContent__informationContainer",
    header: "fplus-FileUploadContent__header",
    description: "fplus-FileUploadContent__description",
    selectFilesButton: "fplus-FileUploadContent__selectFilesButton",
};

/**
 * Styles for the root slot
 */
const useRootResetStyles = makeResetStyles({
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
});

const useStyles = makeStyles({
    vertical: {
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
    horizontal: {
        flexDirection: "row",
        gap: tokens.spacingHorizontalM,
    },
    informationContainer: {
        flexGrow: 1,
        display: "inline-flex",
        flexFlow: "column nowrap",
        gap: tokens.spacingVerticalXXS,
    },
    verticalInformationContainer: {
        alignItems: "center",
        textAlign: "center",
    },
    horizontalInformationContainer: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        textAlign: "start",
        alignSelf: "stretch",
    },
    image: {
        display: "inline-flex",
    }
});

/**
 * Apply styling to the FileUploadContent slots based on the state
 */
export const useFileUploadContentStyles = (state: FileUploadContentState): FileUploadContentState => {
    "use no memo";

    const rootResetStyles = useRootResetStyles();

    const styles = useStyles();

    const rootLayoutMap = {
        vertical: styles.vertical,
        horizontal: styles.horizontal,
    };

    state.root.className = mergeClasses(
        fileUploadContentClassNames.root,
        rootResetStyles,
        rootLayoutMap[state.contentLayout],
        state.root.className
    );

    const informationContainerLayoutMap = {
        vertical: styles.verticalInformationContainer,
        horizontal: styles.horizontalInformationContainer,
    };

    state.informationContainer.className = mergeClasses(
        fileUploadContentClassNames.informationContainer,
        styles.informationContainer,
        informationContainerLayoutMap[state.contentLayout],
        state.informationContainer.className
    );

    if (state.image) {
        state.image.className = mergeClasses(
            fileUploadContentClassNames.image,
            styles.image,
            state.image.className
        );
    }

    return state;
};
