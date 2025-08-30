import { FileUpload } from "@fluent-plus/file-upload";
import { Default } from "./file-upload-default.stories";
import { Example } from "./file-upload-example.stories";

const description = `
TODO: add description
`;

export default {
    title: "File Upload/File Upload",
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
export { Default };
