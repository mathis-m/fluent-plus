import { Button } from "@fluentui/react-components";
import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import { useFileUploadContext } from "../../contexts/file-upload-context";
import type { FileUploadContentProps, FileUploadContentState } from "./file-upload-content.types";

/**
 * This hook creates the state used for rendering FileUploadContent component.
 *
 * The returned state can be modified with hooks such as useFileUploadContentStyles,
 * before being passed to renderFileUploadContent.
 *
 * @param props - props from this instance of FileUploadContent
 * @param ref - reference to root HTMLDivElement of FileUploadContent
 */
export const useFileUploadContent = (
    props: FileUploadContentProps,
    ref: React.Ref<HTMLDivElement>
): FileUploadContentState => {
    const { image, informationContainer, header, description, selectFilesButton } = props;

    const onSelectFilesButtonClick = useFileUploadContext((ctx) => ctx.onSelectFilesButtonClick);
    const disabled = useFileUploadContext((ctx) => ctx.disabled);
    const contentLayout = useFileUploadContext((ctx) => ctx.contentLayout);


    return {
        components: {
            root: "div",
            image: "div",
            informationContainer: "div",
            header: "div",
            description: "div",
            selectFilesButton: Button,
        },
        root: slot.always(
            getIntrinsicElementProps("div", {
                ref,
                ...props,
            }),
            { elementType: "div" }
        ),
        image: slot.optional(image, { elementType: "div" }),
        informationContainer: slot.always(
            informationContainer ?? {},
            {
                elementType: "div",
            }
        ),
        header: slot.optional(header, {
            renderByDefault: true,
            elementType: "div",
        }),
        selectFilesButton: slot.optional(selectFilesButton, {
            renderByDefault: true,
            defaultProps: {
                children: "Select files",
                appearance: "secondary",
                onClick: onSelectFilesButtonClick,
                disabled,
            },
            elementType: Button,
        }),
        description: slot.optional(description, { elementType: "div" }),
        contentLayout,
    };
};
