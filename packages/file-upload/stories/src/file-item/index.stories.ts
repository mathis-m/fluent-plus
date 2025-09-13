import { FileItem } from "@fluent-plus/file-upload";
import { Default } from "./file-item-default.stories";
import { Example } from "./file-item-example.stories";

const description = `
TODO: add description
`;

export default {
    title: "File Upload/File Item",
    component: FileItem,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the File Item component in display order
// organize-imports-ignore
export { Default, Example };
