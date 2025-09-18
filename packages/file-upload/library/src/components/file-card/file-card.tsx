import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileCardProps } from "./file-card.types";
import { renderFileCard } from "./render-file-card";
import { useFileCard } from "./use-file-card";
import { useFileCardStyles } from "./use-file-card-styles";

/**
 * FileCard component
 * Component to render a icon, filename and more details in a Card component.
 */
export const FileCard: ForwardRefComponent<FileCardProps> = React.forwardRef((props, ref) => {
    const state = useFileCard(props, ref);
    useFileCardStyles(state);

    return renderFileCard(state);
});

FileCard.displayName = "FileCard";
