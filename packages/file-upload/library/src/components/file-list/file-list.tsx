import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileListProps } from "./file-list.types";
import { renderFileList } from "./render-file-list";
import { useFileList } from "./use-file-list";
import { useFileListStyles } from "./use-file-list-styles";

/**
 * FileList component
 * TODO: add description
 */
export const FileList: ForwardRefComponent<FileListProps> = React.forwardRef((props, ref) => {
    const state = useFileList(props, ref);
    useFileListStyles(state);

    return renderFileList(state);
});

FileList.displayName = "FileList";
