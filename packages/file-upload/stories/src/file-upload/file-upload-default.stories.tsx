import { FileUpload, FileUploadContent } from "@fluent-plus/file-upload";
import { Caption1, Text } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";

export const Default = () => {
    return (
        <FileUpload>
            <FileUploadContent
                image={<AttachRegular fontSize={44} />}
                header={
                    <Text as="h5" style={{ margin: 0 }} weight="semibold">
                        Upload your files
                    </Text>
                }
                description={<Caption1>Drag and drop files here, or click to select files</Caption1>}
            />
        </FileUpload>
    );
};
