import { FileList } from "@fluent-plus/file-upload";
import { Default } from "./file-list-default.stories";
import { Example } from "./file-list-example.stories";

const description = `
TODO: add description
`;

export default {
    title: "File Upload/File List",
    component: FileList,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the File List component in display order
// organize-imports-ignore
export { Default, Example };
