import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import type { FileUploadProps, FileUploadState } from "./file-upload.types";

/**
 * This hook creates the state used for rendering FileUpload component.
 *
 * The returned state can be modified with hooks such as useFileUploadStyles,
 * before being passed to renderFileUpload.
 *
 * @param props - props from this instance of FileUpload
 * @param ref - reference to root HTMLDivElement of FileUpload
 */
export const useFileUpload = (props: FileUploadProps, ref: React.Ref<HTMLDivElement>): FileUploadState => {
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
