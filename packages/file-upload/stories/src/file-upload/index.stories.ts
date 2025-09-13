import dedent from "dedent";
import { FileUpload } from "@fluent-plus/file-upload";
import { Default } from "./file-upload-default.stories";
import { Layout } from "./file-upload-layout.stories";
import { FileTypes } from "./file-upload-file-types.stories";
import { DropIndication } from "./file-upload-drop-indication.stories";
import { SelectFilesButton } from "./file-upload-select-files-button.stories";

const description = dedent`
    ## FileUpload Component

    The FileUpload component streamlines file selection and uploading with an intuitive drag-and-drop interface and customizable button options.  
    It supports multiple layouts to fit diverse design requirements and provides clear feedback for file types and drop actions. Designed for seamless integration into modern web applications, it ensures both accessibility and flexibility.
`;

export default {
    title: "Components/File Upload",
    component: FileUpload,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the File Upload component in display order
// organize-imports-ignore
export { Default, Layout, FileTypes, DropIndication, SelectFilesButton };
