import { TestY } from "@fluent-plus/test-y";
import { Default } from "./test-y-default.stories";
import { Example } from "./test-y-example.stories";

const description = `
TODO: add description
`;

export default {
    title: "Test Y/Test Y",
    component: TestY,
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
    },
};

// Exporting stories for the Test Y component in display order
// organize-imports-ignore
export { Default, Example };
