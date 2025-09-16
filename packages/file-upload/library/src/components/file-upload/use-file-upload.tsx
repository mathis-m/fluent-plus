import { Button } from "@fluentui/react-components";
import { getIntrinsicElementProps, slot, useEventCallback, useMergedRefs } from "@fluentui/react-utilities";
import { fromEvent } from "file-selector";
import * as React from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { useAcceptedTypes } from "../../hooks/use-accepted-types";
import { hasEventFiles } from "../../utils/has-event-files";
import { RejectedFile, type FileUploadProps, type FileUploadState } from "./file-upload.types";

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
    const {
        header,
        description,
        selectFilesButton,
        input,
        icon,
        contentLayout = "best-fit",
        validators,
        accept,
        onFilesAdded,
        dropIndicationType = "always",
        fileUploadRef,
        openFileSelectionOnGlobalClick = false,
        appearance = "outline-dashed",
        bestFitThreshold = 400,
        disabled = false,
    } = props;

    const combinedValidators = useEventCallback((file: File) => {
        if (!validators || validators.length === 0) return null;

        const errors: FileError[] = [];

        for (const validator of validators) {
            const error = validator(file);
            if (error === null) {
                continue;
            }

            const errorsFromValidator = Array.isArray(error) ? error : [error];
            errors.push(
                ...errorsFromValidator.map((e) => ({
                    code: e,
                    message: e,
                }))
            );
        }

        if (errors.length > 0) return errors;

        return null;
    });

    const onDrop = useEventCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        const rejectedFiles = fileRejections.map<RejectedFile>((r) => ({
            file: r.file,
            errors: r.errors.map((x) => x.code),
        }));
        onFilesAdded?.(acceptedFiles, rejectedFiles);
    });

    const { getRootProps, getInputProps, isDragReject, isDragAccept, open } = useDropzone({
        noClick: !openFileSelectionOnGlobalClick,
        validator: combinedValidators,
        onDrop,
        disabled,
    });

    const rootProps = getRootProps();
    const [internalRefElement, setInternalRefElement] = React.useState<HTMLDivElement | null>(null);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRefs(ref, rootProps.ref, setInternalRefElement, internalRef);

    React.useImperativeHandle(
        fileUploadRef,
        () => ({
            openFileSelectionDialog: open,
        }),
        [open]
    );

    const [showDropIndicator, setShowDropIndicator] = React.useState(false);
    const [bestFitLayout, setBestFitLayout] = React.useState<"horizontal" | "vertical">("horizontal");

    const onResize = useEventCallback((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        if (!entry) return;

        const { width } = entry.contentRect;
        const newLayout = width >= bestFitThreshold ? "horizontal" : "vertical";
        setBestFitLayout(newLayout);
    });

    const [resizeObserver] = React.useState(() => new ResizeObserver(onResize));

    React.useEffect(() => {
        if (contentLayout !== "best-fit") {
            return;
        }

        if (internalRefElement) {
            resizeObserver.observe(internalRefElement);
        }

        return () => {
            if (internalRefElement) {
                resizeObserver.unobserve(internalRefElement);
            }
        };
    }, [contentLayout, internalRefElement, resizeObserver]);

    React.useEffect(() => {
        return () => {
            resizeObserver.disconnect();
        };
    }, [resizeObserver]);

    const onDragStartHandler = useEventCallback(async (event: DragEvent) => {
        if (dropIndicationType === "none") return;
        if (!hasEventFiles(event)) return;

        if (dropIndicationType === "always") {
            setShowDropIndicator(true);
            return;
        }

        const files = await fromEvent(event);

        let hasValidFiles: boolean;
        if (dropIndicationType === "some-accepted")
            hasValidFiles = files.some((file) => combinedValidators(file as File) === null);
        else hasValidFiles = files.every((file) => combinedValidators(file as File) === null);

        setShowDropIndicator(hasValidFiles);
    });

    const onDragEndHandler = useEventCallback(() => {
        setShowDropIndicator(false);
    });

    React.useEffect(() => {
        document.addEventListener("dragover", onDragStartHandler);
        document.addEventListener("dragleave", onDragEndHandler);
        document.addEventListener("dragend", onDragEndHandler);
        document.addEventListener("drop", onDragEndHandler);

        return () => {
            document.removeEventListener("dragover", onDragStartHandler);
            document.removeEventListener("dragleave", onDragEndHandler);
            document.removeEventListener("dragend", onDragEndHandler);
            document.removeEventListener("drop", onDragEndHandler);
        };
    }, [onDragStartHandler, onDragEndHandler]);

    const onSelectFilesButtonClick = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (event.isDefaultPrevented()) {
                return;
            }
            open();
        },
        [open]
    );

    const acceptedTypes = useAcceptedTypes(accept);
    const inputAcceptProp = React.useMemo(() => {
        return acceptedTypes.length > 0 ? acceptedTypes.join(",") : undefined;
    }, [acceptedTypes]);

    return {
        components: {
            root: "div",
            icon: "span",
            header: "div",
            description: "div",
            selectFilesButton: Button,
            input: "input",
        },
        root: slot.always(
            getIntrinsicElementProps("div", {
                ref: mergedRefs,
                ...props,
                style: {
                    ...props.style,
                },
            }),
            {
                defaultProps: {
                    ...getRootProps(),
                    role: openFileSelectionOnGlobalClick ? "button" : "presentation",
                },
                elementType: "div",
            }
        ),
        icon: slot.optional(icon, { elementType: "span" }),
        header: slot.optional(header, {
            renderByDefault: true,
            elementType: "div",
        }),
        description: slot.optional(description, { elementType: "div" }),
        selectFilesButton: slot.optional(selectFilesButton, {
            renderByDefault: true,
            defaultProps: {
                children: "Select files",
                appearance: "secondary",
                onClick: onSelectFilesButtonClick,
                disabled
            },
            elementType: Button,
        }),
        input: slot.optional(input, {
            renderByDefault: true,
            defaultProps: {
                ...getInputProps(),
                children: undefined,
                accept: inputAcceptProp,
            },
            elementType: "input",
        }),
        contentLayout,
        showDropIndicator,
        isDragReject,
        isDragAccept,
        openFileSelectionOnGlobalClick,
        appearance,
        bestFitThreshold,
        resolvedLayout: contentLayout === "best-fit" ? bestFitLayout : contentLayout,
        disabled
    };
};
