/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import {
    Button,
    Caption1,
    Card,
    CardHeader,
    CardProps,
    Text,
    TextPresetProps,
    TextProps,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { assertSlots, ComponentState, getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import { useFileUploadContext } from "../..";
import { getFileSize } from "../../utils/get-file-size";
import type { FileCardProps, FileCardSlots, FileCardState } from "./file-card.types";
import { useHeaderStyles } from "./use-file-card-styles";

/**
 * This hook creates the state used for rendering FileCard component.
 *
 * The returned state can be modified with hooks such as useFileCardStyles,
 * before being passed to renderFileCard.
 *
 * @param props - props from this instance of FileCard
 * @param ref - reference to root HTMLDivElement of FileCard
 */
export const useFileCard = (props: FileCardProps, ref: React.Ref<HTMLDivElement>): FileCardState => {
    const {
        children,
        file,
        cardHeader,
        filename: filenameSlotFromProps,
        fileSize: fileSizeSlotFromProps,
        contentBefore,
        contentAfter,
        ...restProps
    } = props;

    const uploadAppearance = useFileUploadContext((ctx) => ctx.appearance);

    const appearance = React.useMemo<Required<CardProps>["appearance"]>(() => {
        switch (uploadAppearance) {
            case "outline-dashed":
                return "filled-alternative";
            case "outline-dashed-alternative":
                return "filled";
            case "outline":
                return "filled-alternative";
            case "outline-alternative":
                return "filled";
            case "filled":
                return "outline";
            case "filled-alternative":
                return "outline";
        }
    }, [uploadAppearance]);

    const { filename, fileSize } = React.useMemo(() => {
        return {
            filename: file.name,
            fileSize: getFileSize(file.size),
        };
    }, [file]);

    const filenameSlot = slot.always<TextProps>(filenameSlotFromProps, {
        defaultProps: {
            children: filename,
            as: "h5",
            weight: "semibold",
        },
        elementType: Text,
    });
    const fileSizeSlot = slot.always<TextPresetProps>(fileSizeSlotFromProps, {
        defaultProps: { children: fileSize },
        elementType: Caption1,
    });
    const thumbnailSlot = slot.optional(props.thumbnail, { elementType: "div" });

    const removeButtonSlot = slot.optional(props.removeButton, {
        elementType: Button,
        renderByDefault: true,
        defaultProps: {
            icon: <DismissRegular />,
            appearance: "subtle",
        },
    });

    const cardHeaderState: ComponentState<
        Pick<Required<FileCardProps>, "filename" | "fileSize" | "thumbnail" | "removeButton">
    > = {
        components: {
            filename: Text,
            fileSize: Caption1,
            thumbnail: "div",
            removeButton: Button,
        },
        filename: filenameSlot,
        fileSize: fileSizeSlot,
        thumbnail: thumbnailSlot,
        removeButton: removeButtonSlot,
    };

    useHeaderStyles(cardHeaderState);

    assertSlots<Pick<FileCardSlots, "filename" | "fileSize" | "thumbnail" | "removeButton">>(cardHeaderState);

    return {
        components: {
            root: Card,
            cardHeader: CardHeader,
            filename: Text,
            fileSize: Caption1,
            removeButton: Button,
            thumbnail: "div",
            contentAfter: "div",
            contentBefore: "div",
        },
        root: slot.always<CardProps>(
            getIntrinsicElementProps("div", {
                ref,
                ...restProps,
            }),
            {
                defaultProps: {
                    appearance: appearance,
                    focusMode: "tab-only",
                    size: "small",
                    ...restProps,
                },
                elementType: Card,
            }
        ),
        cardHeader: slot.always(cardHeader ?? {}, {
            elementType: CardHeader,
            defaultProps: {
                header: <cardHeaderState.filename />,
                description: <cardHeaderState.fileSize />,
                image: cardHeaderState.thumbnail ? <cardHeaderState.thumbnail /> : undefined,
                action: cardHeaderState.removeButton ? <cardHeaderState.removeButton /> : undefined,
            },
        }),
        contentBefore: slot.optional(contentBefore, { elementType: "div" }),
        contentAfter: slot.optional(contentAfter, { elementType: "div" }),
        children,
        filename: filenameSlot,
        fileSize: fileSizeSlot,
        thumbnail: thumbnailSlot,
        removeButton: removeButtonSlot,
        uploadAppearance,
    };
};
