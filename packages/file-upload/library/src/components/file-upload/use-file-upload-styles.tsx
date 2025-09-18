import { createFocusOutlineStyle, tokens } from "@fluentui/react-components";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { FileUploadSlots, FileUploadState } from "./file-upload.types";

export const fileUploadClassNames: SlotClassNames<FileUploadSlots> = {
    root: "fplus-FileUpload",
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
    vertical: {
        paddingInline: tokens.spacingHorizontalXXL,
        paddingBlock: tokens.spacingVerticalXL,
    },
    horizontal: {
        paddingInline: tokens.spacingHorizontalXL,
        paddingBlock: tokens.spacingVerticalXXL,
    },
    disabled: {
        cursor: "not-allowed",
        userSelect: "none",
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: tokens.colorNeutralBackgroundDisabled,
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    noBackgroundColor: {
        backgroundColor: tokens.colorTransparentBackground,
    },
    noBorderColor: {
        ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
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
 * Apply styling to the FileUpload slots based on the state
 */
export const useFileUploadStyles = (state: FileUploadState): FileUploadState => {
    "use no memo";

    const styles = useStyles();
    const interactionStyles = useInteractionStyles();

    const appearanceMap: Record<NonNullable<FileUploadState["appearance"]>, string> = {
        filled: styles.filled,
        "filled-alternative": styles.filledAlternative,
        outline: styles.outline,
        "outline-alternative": styles.outlineAlternative,
        "outline-dashed": styles.outlineDashed,
        "outline-dashed-alternative": styles.outlineDashedAlternative,
    };

    const disabledAppearanceMap: Record<NonNullable<FileUploadState["appearance"]>, string | undefined> = {
        filled: styles.noBorderColor,
        "filled-alternative": styles.noBorderColor,
        outline: styles.noBackgroundColor,
        "outline-alternative": styles.noBackgroundColor,
        "outline-dashed": styles.noBackgroundColor,
        "outline-dashed-alternative": styles.noBackgroundColor,
    };

    const layoutMap = {
        vertical: styles.vertical,
        horizontal: styles.horizontal,
    };

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

    state.root.className = mergeClasses(
        fileUploadClassNames.root,
        styles.root,
        appearanceMap[state.appearance],
        interaction && interactionStyles[interaction],
        state.openFileSelectionOnGlobalClick && styles.clickable,
        state.disabled && styles.disabled,
        state.disabled && disabledAppearanceMap[state.appearance],
        layoutMap[state.resolvedLayout],
    );

    // Input slot styling
    if (state.input) {
        state.input.className = mergeClasses(fileUploadClassNames.input, styles.input);
    }

    return state;
};
