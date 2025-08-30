import { TestX } from "@fluent-plus/test-x";

export const Example = () => {
    return (
        <div>
            <h3>TODO: Story missing</h3>
            <TestX />
        </div>
    );
};

Example.parameters = {
    docs: {
        description: {
            story: `The story description can use **markdown**!`,
        },
    },
};
