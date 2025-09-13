import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileItemProps, FileItemState } from "./file-item.types";

/**
 * This hook creates the state used for rendering FileItem component.
 *
 * The returned state can be modified with hooks such as useFileItemStyles,
 * before being passed to renderFileItem.
 *
 * @param props - props from this instance of FileItem
 * @param ref - reference to root HTMLDivElement of FileItem
 */
export const useFileItem = (props: FileItemProps, ref: React.Ref<HTMLDivElement>): FileItemState => {
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
