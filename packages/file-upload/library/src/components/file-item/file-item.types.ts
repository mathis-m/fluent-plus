import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the FileItem component
 */
export type FileItemSlots = {
    root: Slot<"div">;
};

/**
 * Props for the FileItem component
 */
export type FileItemProps = ComponentProps<FileItemSlots> & {};

/**
 * State for the FileItem component
 */
export type FileItemState = ComponentState<FileItemSlots>;
// & Required<Pick<FileItemProps, 'propName'>>;
