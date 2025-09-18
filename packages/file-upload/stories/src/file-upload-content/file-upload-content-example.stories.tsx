import { FileUploadContent } from "@fluent-plus/file-upload";
import dedent from "dedent";

export const Example = () => {
    return (
        <div>
            <h3>TODO: Story missing</h3>
            <FileUploadContent />
        </div>
    );
};

Example.parameters = {
    docs: {
        description: {
            story: dedent`
                The story description can use **markdown**!
            `,
        },
    },
};
