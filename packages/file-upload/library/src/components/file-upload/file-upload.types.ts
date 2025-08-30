import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the FileUpload component
 */
export type FileUploadSlots = {
    root: Slot<"div">;
};

/**
 * Props for the FileUpload component
 */
export type FileUploadProps = ComponentProps<FileUploadSlots> & {};

/**
 * State for the FileUpload component
 */
export type FileUploadState = ComponentState<FileUploadSlots>;
// & Required<Pick<FileUploadProps, 'propName'>>;
