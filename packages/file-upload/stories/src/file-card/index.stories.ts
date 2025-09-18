import { FileCard } from "@fluent-plus/file-upload";
import { Default } from "./file-card-default.stories";
import dedent from "dedent";

const description = dedent`
    Component to render a icon, filename and more details in a Card component.
`;

export default {
    title: "Components/File Upload/FileCard",
    component: FileCard,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the File Card component in display order
// organize-imports-ignore
export { Default };
