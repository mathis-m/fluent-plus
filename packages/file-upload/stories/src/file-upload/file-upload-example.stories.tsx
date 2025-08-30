import { FileUpload } from "@fluent-plus/file-upload";

export const Example = () => {
    return (
        <div>
            <h3>TODO: Story missing</h3>
            <FileUpload />
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
