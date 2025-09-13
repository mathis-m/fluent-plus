import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileItemProps } from "./file-item.types";
import { renderFileItem } from "./render-file-item";
import { useFileItem } from "./use-file-item";
import { useFileItemStyles } from "./use-file-item-styles";

/**
 * FileItem component
 * TODO: add description
 */
export const FileItem: ForwardRefComponent<FileItemProps> = React.forwardRef((props, ref) => {
    const state = useFileItem(props, ref);
    useFileItemStyles(state);

    return renderFileItem(state);
});

FileItem.displayName = "FileItem";
