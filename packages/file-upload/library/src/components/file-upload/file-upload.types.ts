import { Button } from "@fluentui/react-components";
import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";
import { RefObject } from "react";

/**
 * Slots for the FileUpload component
 */
export type FileUploadSlots = {
    /**
     * Root element of the component
     */
    root: Slot<"div">;

    /**
     * Element used to render the icon
     */
    icon?: Slot<"span">;

    /**
     * Element used to render the header title
     */
    header: Slot<"div">;

    /**
     * Element used to render the secondary descriptive text
     */
    description?: Slot<"div">;

    /**
     * Element used to render the drag and drop fallback button
     */
    selectFilesButton?: Slot<typeof Button>;

    /**
     * Hidden file input element
     */
    input?: Slot<"input">;
};

/**
 * Props for the FileUpload component
 */
export type FileUploadProps = ComponentProps<FileUploadSlots> & {
    /**
     * Content layout of the FileUpload component
     * @default 'horizontal'
     */
    contentLayout?: "horizontal" | "vertical";

    /**
     * Accepted mime type to file extension mapping to be used for the file picker dialog.
     */
    accept?: Record<string, readonly string[]>;

    /**
     * Called when files are dropped or selected via the browser file selection dialog
     */
    onFilesAdded?: (acceptedFiles: File[], rejectedFiles: RejectedFile[]) => void;

    /**
     * Validators for files. This will impact the onFilesAdded callback payload and visualization on drag over
     */
    validators?: FileValidator[];

    /**
     * Indicates that the file upload can be used for the files that are currently dragged.
     * This is useful if you want to highlight the dropzone while the user drags.
     * @default 'always'
     */
    dropIndicationType?: "none" | "some-accepted" | "all-accepted" | "always";

    /**
     * Provide a ref to get access to the open file dialog utility.
     */
    fileUploadRef?: RefObject<FileUploadUtils>;

    /**
     * Make the whole component clickable. This will open the file selection dialog on click within the component.
     * In addition, this will hide the select files button.
     * @default false
     */
    openFileSelectionOnGlobalClick?: boolean;
};

/**
 * Known error types
 */
export type KnownFileRejectionError = "invalid-type" | "file-too-large" | "file-too-small" | "too-many-files";

/**
 * Represets a file that was rejected for a given reason
 */
export type RejectedFile = {
    errors: Array<KnownFileRejectionError | string>;
    file: File;
};

/**
 * File validator function that returns rejection reason
 */
export type FileValidator = (
    file: File
) => null | Array<KnownFileRejectionError | string> | KnownFileRejectionError | string;

export type FileUploadUtils = {
    openFileSelectionDialog: () => void;
};

/**
 * State for the FileUpload component
 */
export type FileUploadState = ComponentState<FileUploadSlots> &
    Required<Pick<FileUploadProps, "contentLayout" | "openFileSelectionOnGlobalClick">> & {
        showDropIndicator: boolean;
        isDragReject: boolean;
        isDragAccept: boolean;
    };
