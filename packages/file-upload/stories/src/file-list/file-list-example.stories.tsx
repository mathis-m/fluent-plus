import { FileList } from "@fluent-plus/file-upload";

export const Example = () => {
    return (
        <div>
            <h3>TODO: Story missing</h3>
            <FileList />
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
