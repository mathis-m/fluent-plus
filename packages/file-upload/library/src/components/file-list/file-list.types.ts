import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the FileList component
 */
export type FileListSlots = {
    root: Slot<"div">;
};

/**
 * Props for the FileList component
 */
export type FileListProps = ComponentProps<FileListSlots> & {};

/**
 * State for the FileList component
 */
export type FileListState = ComponentState<FileListSlots>;
// & Required<Pick<FileListProps, 'propName'>>;
