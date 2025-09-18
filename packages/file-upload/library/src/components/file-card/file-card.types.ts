import { Button, Caption1, Card, CardHeader, CardProps, Text } from "@fluentui/react-components";
import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the FileCard component
 */
export type FileCardSlots = {
    root: Slot<typeof Card>;

    /**
     * CardHeader component to render the filename and file details
     */
    cardHeader?: NonNullable<Slot<typeof CardHeader>>;

    /**
     * Element used to render a icon or thumbnail representing the file type
     */
    thumbnail?: Slot<"div">;

    /**
     * Element to display the filename
     */
    filename?: NonNullable<Slot<typeof Text>>;

    /**
     * Element to display the file size
     */
    fileSize?: NonNullable<Slot<typeof Caption1>>;

    /**
     * Element to display the file type icon
     */
    removeButton?: Slot<typeof Button>;

    /**
     * Element to display content above the card header
     */
    contentBefore?: Slot<"div">;

    /**
     * Element to display content below the card header
     */
    contentAfter?: Slot<"div">;
};

/**
 * Props for the FileCard component
 */
export type FileCardProps = ComponentProps<FileCardSlots> & {
    file: File;
};

/**
 * State for the FileCard component
 */
export type FileCardState = ComponentState<
    Omit<FileCardSlots, "cardHeader" | "filename" | "fileSize" | "thumbnail"> &
        Pick<Required<FileCardProps>, "cardHeader" | "filename" | "fileSize" | "thumbnail">
> &
    Required<Pick<FileCardProps, "children">> & { uploadAppearance: Required<FileCardProps>["appearance"] };
