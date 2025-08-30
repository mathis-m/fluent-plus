import { TestY } from "@fluent-plus/test-y";

export const Example = () => {
    return (
        <div>
            <h3>TODO: Story missing</h3>
            <TestY />
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
