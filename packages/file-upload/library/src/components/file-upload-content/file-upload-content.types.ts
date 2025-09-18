import { Button } from "@fluentui/react-components";
import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";
import { FileUploadContextValue } from "../../contexts/file-upload-context";

/**
 * Slots for the FileUploadContent component
 */
export type FileUploadContentSlots = {
    /**
     * Root element of the component
     */
    root: Slot<"div">;

    /**
     * Element used to render the image
     */
    image?: Slot<"div">;

    /**
     * Element used to render the file upload area
     */
    informationContainer?: NonNullable<Slot<"div">>;

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
};

/**
 * Props for the FileUploadContent component
 */
export type FileUploadContentProps = ComponentProps<FileUploadContentSlots> & {};

/**
 * State for the FileUploadContent component
 */
export type FileUploadContentState = ComponentState<
    Omit<FileUploadContentSlots, "informationContainer"> &
        Pick<Required<FileUploadContentProps>, "informationContainer">
> & {
    contentLayout: FileUploadContextValue["contentLayout"];
};
