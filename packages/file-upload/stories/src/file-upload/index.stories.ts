import dedent from "dedent";
import { FileCard, FileUpload, FileUploadContent } from "@fluent-plus/file-upload";
import { Default } from "./file-upload-default.stories";
import { SingleFileUpload } from "./file-upload-single-file.stories";
import { MultiFileUpload } from "./file-upload-multi-file.stories";
import { Layout } from "./file-upload-layout.stories";
import { FileTypes } from "./file-upload-file-types.stories";
import { DropIndication } from "./file-upload-drop-indication.stories";
import { SelectFilesButton } from "./file-upload-select-files-button.stories";
import { Appearance } from "./file-upload-appearance.stories";
import { Disabled } from "./file-upload-disabled.stories";

const description = dedent`
    The FileUpload component streamlines file selection and uploading with an intuitive drag-and-drop interface and customizable button options.  
    It supports multiple layouts to fit diverse design requirements and provides clear feedback for file types and drop actions. Designed for seamless integration into modern web applications, it ensures both accessibility and flexibility.
`;

export default {
    title: "Components/File Upload/FileUpload",
    component: FileUpload,
    subcomponents: { FileUploadContent, FileCard },
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
export { Default, SingleFileUpload, MultiFileUpload, Layout, FileTypes, DropIndication, SelectFilesButton, Appearance, Disabled };
