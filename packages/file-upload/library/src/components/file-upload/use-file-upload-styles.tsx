import { createFocusOutlineStyle, tokens } from "@fluentui/react-components";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { FileUploadSlots, FileUploadState } from "./file-upload.types";

export const fileUploadClassNames: SlotClassNames<FileUploadSlots> = {
    root: "fplus-FileUpload",
    icon: "fplus-FileUpload__icon",
    header: "fplus-FileUpload__header",
    description: "fplus-FileUpload__description",
    selectFilesButton: "fplus-FileUpload__selectFilesButton",
    input: "fplus-FileUpload__input",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
    root: {
        position: "relative",
        ...shorthands.borderWidth(tokens.strokeWidthThick),
        ...shorthands.borderStyle("dashed"),
        ...shorthands.borderColor(tokens.colorNeutralStencil1),
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground2,
        outline: "none",
        transition: `border-color ${tokens.durationFast} ${tokens.curveEasyEase}`,
        ...createFocusOutlineStyle(),
    },
    clickable: {
        cursor: "pointer",
    },
    horizontal: {
        paddingBlock: tokens.spacingVerticalXXL,
        paddingInline: tokens.spacingHorizontalXL,
    },
    vertical: {
        paddingBlock: tokens.spacingHorizontalXL,
        paddingInline: tokens.spacingVerticalXXL,
    },
    icon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: tokens.fontSizeBase600,
    },
    iconLarge: {
        fontSize: tokens.fontSizeHero800,
    },
    input: {
        display: "none",
    },
});

const useInteractionStyles = makeStyles({
    indicator: {
        ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
    accept: {
        ...shorthands.borderColor(tokens.colorPaletteLightGreenBorderActive),
    },
    reject: {
        ...shorthands.borderColor(tokens.colorPaletteRedBorderActive),
    },
});

/**
 * Styles for layout horizontal when description is present
 */
const useGridStyles = makeStyles({
    root: {
        display: "grid",
        gridAutoColumns: "min-content 1fr auto 0px",
        columnGap: tokens.spacingHorizontalXS,
        rowGap: tokens.spacingVerticalXS,
        alignItems: "center",
    },
    horizontal: {},
    vertical: {},
    icon: {
        marginRight: tokens.spacingHorizontalM,
        gridColumnStart: "1",
        gridRowStart: "span 2",
    },
    header: {
        gridColumnStart: "2",
        gridRowStart: "1",
    },
    description: {
        gridColumnStart: "2",
        gridRowStart: "2",
    },
    selectFilesButton: {
        marginLeft: tokens.spacingHorizontalM,
        gridColumnStart: "3",
        gridRowStart: "span 2",
    },
    input: {
        gridColumnStart: "4",
        gridRowStart: "span 2",
    },
});

/**
 * Styles for layout horizontal when description is absent and for vertical layout
 */
const useFlexStyles = makeStyles({
    root: {
        display: "flex",
        columnGap: tokens.spacingHorizontalXS,
        rowGap: tokens.spacingVerticalXS,
    },
    horizontal: {
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",

        [`& .${fileUploadClassNames.icon}`]: {
            marginRight: tokens.spacingHorizontalM,
        },

        [`& .${fileUploadClassNames.selectFilesButton}`]: {
            marginLeft: tokens.spacingHorizontalM,
        },

        [`& .${fileUploadClassNames.header}`]: {
            flexGrow: 1,
        },
    },
    vertical: {
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",

        [`& .${fileUploadClassNames.icon}`]: {
            marginBottom: tokens.spacingHorizontalM,
        },

        [`& .${fileUploadClassNames.selectFilesButton}`]: {
            marginTop: tokens.spacingHorizontalM,
        },

        [`& .${fileUploadClassNames.header}`]: {
            textAlign: "center",
        },

        [`& .${fileUploadClassNames.description}`]: {
            textAlign: "center",
        },
    },
});

/**
 * Apply styling to the FileUpload slots based on the state
 */
export const useFileUploadStyles = (state: FileUploadState): FileUploadState => {
    "use no memo";

    const styles = useStyles();
    const gridStyles = useGridStyles();
    const flexStyles = useFlexStyles();
    const interactionStyles = useInteractionStyles();

    const hasDescription = !!state.description;
    const useGridLayout = state.contentLayout === "horizontal" && hasDescription;
    const useLargeIcon = hasDescription || state.contentLayout === "vertical";

    const layoutStyles = useGridLayout ? gridStyles : flexStyles;

    let interaction: keyof ReturnType<typeof useInteractionStyles> | undefined;
    if (state.showDropIndicator) {
        interaction = "indicator";
    }
    if (state.isDragAccept) {
        interaction = "accept";
    }
    if (state.isDragReject) {
        interaction = "reject";
    }

    // Root slot styling
    state.root.className = mergeClasses(
        fileUploadClassNames.root,
        styles.root,
        styles[state.contentLayout],
        layoutStyles.root,
        layoutStyles[state.contentLayout],
        interaction && interactionStyles[interaction],
        state.openFileSelectionOnGlobalClick && styles.clickable
    );

    // Icon slot styling
    if (state.icon) {
        state.icon.className = mergeClasses(
            fileUploadClassNames.icon,
            styles.icon,
            useGridLayout && gridStyles.icon,
            useLargeIcon && styles.iconLarge
        );
    }

    // Header slot styling
    if (state.header) {
        state.header.className = mergeClasses(
            fileUploadClassNames.header,
            useGridLayout && gridStyles.header
        );
    }

    // Description slot styling
    if (state.description) {
        state.description.className = mergeClasses(
            fileUploadClassNames.description,
            useGridLayout && gridStyles.description
        );
    }

    // Select files button slot styling
    if (state.selectFilesButton) {
        state.selectFilesButton.className = mergeClasses(
            fileUploadClassNames.selectFilesButton,
            useGridLayout && gridStyles.selectFilesButton
        );
    }

    // Input slot styling
    if (state.input) {
        state.input.className = mergeClasses(
            fileUploadClassNames.input,
            styles.input,
            useGridLayout && gridStyles.input
        );
    }

    return state;
};
