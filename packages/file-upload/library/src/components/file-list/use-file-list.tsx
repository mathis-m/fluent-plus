import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileListProps, FileListState } from "./file-list.types";

/**
 * This hook creates the state used for rendering FileList component.
 *
 * The returned state can be modified with hooks such as useFileListStyles,
 * before being passed to renderFileList.
 *
 * @param props - props from this instance of FileList
 * @param ref - reference to root HTMLDivElement of FileList
 */
export const useFileList = (props: FileListProps, ref: React.Ref<HTMLDivElement>): FileListState => {
    return {
        components: {
            root: "div",
        },
        root: slot.always(
            getIntrinsicElementProps("div", {
                ref,
                ...props,
            }),
            { elementType: "div" }
        ),
    };
};
