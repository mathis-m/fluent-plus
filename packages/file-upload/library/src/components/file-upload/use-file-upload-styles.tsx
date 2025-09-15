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
        borderRadius: tokens.borderRadiusMedium,
        outline: "none",
        transition: `border-color ${tokens.durationFast} ${tokens.curveEasyEase}`,
        ...shorthands.borderStyle("solid"),
        ...createFocusOutlineStyle(),
    },
    clickable: {
        cursor: "pointer",
    },
    filled: {
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        ...shorthands.borderColor(tokens.colorTransparentStroke),
        ...shorthands.borderWidth(tokens.strokeWidthThin),
    },
    filledAlternative: {
        backgroundColor: tokens.colorNeutralBackground2,
        boxShadow: tokens.shadow4,
        ...shorthands.borderColor(tokens.colorTransparentStroke),
        ...shorthands.borderWidth(tokens.strokeWidthThin),
    },
    outline: {
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderStyle("solid"),
        ...shorthands.borderWidth(tokens.strokeWidthThin),
    },
    outlineAlternative: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderStyle("solid"),
        ...shorthands.borderWidth(tokens.strokeWidthThin),
    },
    outlineDashed: {
        backgroundColor: tokens.colorTransparentBackground,
        ...shorthands.borderStyle("dashed"),
        ...shorthands.borderWidth(tokens.strokeWidthThick),
        ...shorthands.borderColor(tokens.colorNeutralStencil1),
    },
    outlineDashedAlternative: {
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderStyle("dashed"),
        ...shorthands.borderWidth(tokens.strokeWidthThick),
        ...shorthands.borderColor(tokens.colorNeutralStencil1),
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
 * Layout styles
 */
const useLayoutStyles = makeStyles({
    // Grid layout styles (used for horizontal layout with description)
    gridLayout: {
        display: "grid",
        gridAutoColumns: "min-content 1fr auto 0px",
        columnGap: tokens.spacingHorizontalXS,
        rowGap: tokens.spacingVerticalXS,
        alignItems: "center",
        paddingBlock: tokens.spacingVerticalXXL,
        paddingInline: tokens.spacingHorizontalXL,
    },
    gridIcon: {
        marginRight: tokens.spacingHorizontalM,
        gridColumnStart: "1",
        gridRowStart: "span 2",
    },
    gridHeader: {
        gridColumnStart: "2",
        gridRowStart: "1",
    },
    gridDescription: {
        gridColumnStart: "2",
        gridRowStart: "2",
    },
    gridButton: {
        marginLeft: tokens.spacingHorizontalM,
        gridColumnStart: "3",
        gridRowStart: "span 2",
    },
    gridInput: {
        gridColumnStart: "4",
        gridRowStart: "span 2",
    },

    // Horizontal flex layout styles (used for horizontal layout without description)
    horizontalLayout: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: tokens.spacingHorizontalXS,
        rowGap: tokens.spacingVerticalXS,
        paddingBlock: tokens.spacingVerticalXXL,
        paddingInline: tokens.spacingHorizontalXL,
    },
    horizontalIcon: {
        marginRight: tokens.spacingHorizontalM,
    },
    horizontalHeader: {
        flexGrow: 1,
    },
    horizontalButton: {
        marginLeft: tokens.spacingHorizontalM,
    },

    // Vertical flex layout styles
    verticalLayout: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        columnGap: tokens.spacingHorizontalXS,
        rowGap: tokens.spacingVerticalXS,
        paddingBlock: tokens.spacingHorizontalXL,
        paddingInline: tokens.spacingVerticalXXL,
    },
    verticalIcon: {
        marginBottom: tokens.spacingHorizontalM,
    },
    verticalHeader: {
        textAlign: "center",
    },
    verticalDescription: {
        textAlign: "center",
    },
    verticalButton: {
        marginTop: tokens.spacingHorizontalM,
    },
});

/**
 * Apply styling to the FileUpload slots based on the state
 */
export const useFileUploadStyles = (state: FileUploadState): FileUploadState => {
    "use no memo";

    const styles = useStyles();
    const layoutStyles = useLayoutStyles();
    const interactionStyles = useInteractionStyles();

    const appearanceMap: Record<NonNullable<FileUploadState["appearance"]>, string> = {
        filled: styles.filled,
        "filled-alternative": styles.filledAlternative,
        outline: styles.outline,
        "outline-alternative": styles.outlineAlternative,
        "outline-dashed": styles.outlineDashed,
        "outline-dashed-alternative": styles.outlineDashedAlternative,
    };

    const hasDescription = !!state.description;
    const useGridLayout = state.resolvedLayout === "horizontal" && hasDescription;
    const useLargeIcon = state.resolvedLayout === "vertical" || hasDescription;

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
    const rootClasses = [
        fileUploadClassNames.root,
        styles.root,
        appearanceMap[state.appearance],
        interaction && interactionStyles[interaction],
        state.openFileSelectionOnGlobalClick && styles.clickable,
    ];

    // Apply layout styles to root
    if (useGridLayout) {
        rootClasses.push(layoutStyles.gridLayout);
    } else if (state.resolvedLayout === "horizontal") {
        rootClasses.push(layoutStyles.horizontalLayout);
    } else {
        rootClasses.push(layoutStyles.verticalLayout);
    }

    state.root.className = mergeClasses(...rootClasses);

    // Icon slot styling
    if (state.icon) {
        const iconClasses = [fileUploadClassNames.icon, styles.icon, useLargeIcon && styles.iconLarge];

        // Apply layout-specific icon styles
        if (useGridLayout) {
            iconClasses.push(layoutStyles.gridIcon);
        } else if (state.resolvedLayout === "horizontal") {
            iconClasses.push(layoutStyles.horizontalIcon);
        } else {
            iconClasses.push(layoutStyles.verticalIcon);
        }

        state.icon.className = mergeClasses(...iconClasses);
    }

    // Header slot styling
    if (state.header) {
        const headerClasses = [fileUploadClassNames.header];

        // Apply layout-specific header styles
        if (useGridLayout) {
            headerClasses.push(layoutStyles.gridHeader);
        } else if (state.resolvedLayout === "horizontal") {
            headerClasses.push(layoutStyles.horizontalHeader);
        } else {
            headerClasses.push(layoutStyles.verticalHeader);
        }

        state.header.className = mergeClasses(...headerClasses);
    }

    // Description slot styling
    if (state.description) {
        const descriptionClasses = [fileUploadClassNames.description];

        // Apply layout-specific description styles
        if (useGridLayout) {
            descriptionClasses.push(layoutStyles.gridDescription);
        } else if (state.resolvedLayout === "vertical") {
            descriptionClasses.push(layoutStyles.verticalDescription);
        }

        state.description.className = mergeClasses(...descriptionClasses);
    }

    // Select files button slot styling
    if (state.selectFilesButton) {
        const buttonClasses = [fileUploadClassNames.selectFilesButton];

        // Apply layout-specific button styles
        if (useGridLayout) {
            buttonClasses.push(layoutStyles.gridButton);
        } else if (state.resolvedLayout === "horizontal") {
            buttonClasses.push(layoutStyles.horizontalButton);
        } else {
            buttonClasses.push(layoutStyles.verticalButton);
        }

        state.selectFilesButton.className = mergeClasses(...buttonClasses);
    }

    // Input slot styling
    if (state.input) {
        const inputClasses = [fileUploadClassNames.input, styles.input];

        // Apply layout-specific input styles (only grid has specific input styles)
        if (useGridLayout) {
            inputClasses.push(layoutStyles.gridInput);
        }

        state.input.className = mergeClasses(...inputClasses);
    }

    return state;
};
