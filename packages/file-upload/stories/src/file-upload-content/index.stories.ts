import { FileUploadContent } from "@fluent-plus/file-upload";
import { Default } from "./file-upload-content-default.stories";
import { Example } from "./file-upload-content-example.stories";
import dedent from "dedent";

const description = dedent`
    Component to render a title and description in a FileUpload component.
`;

export default {
    title: "Components/File Upload/FileUploadContent",
    component: FileUploadContent,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the File Upload Content component in display order
// organize-imports-ignore
export { Default, Example };
