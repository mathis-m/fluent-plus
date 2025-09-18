import { FileUploadContent } from "@fluent-plus/file-upload";
import { Text } from "@fluentui/react-components";

export const Default = () => {
    return (
        <FileUploadContent
            header={
                <Text as="h5" style={{ margin: 0 }} weight="semibold">
                    Upload your files
                </Text>
            }
        />
    );
};
