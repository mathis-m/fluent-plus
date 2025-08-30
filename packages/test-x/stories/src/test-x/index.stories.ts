import { TestX } from "@fluent-plus/test-x";
import { Default } from "./test-x-default.stories";
import { Example } from "./test-x-example.stories";

const description = `
TODO: add description
`;

export default {
    title: "Test X/Test X",
    component: TestX,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the Test X component in display order
// organize-imports-ignore
export { Default, Example };
