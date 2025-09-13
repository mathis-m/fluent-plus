import { FileUpload, RejectedFile, useFileTypeValidator } from "@fluent-plus/file-upload";
import { Caption1, makeStyles, Text, tokens } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { use } from "motion/react-client";
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
});

const acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
};

export const FileTypes = () => {
    const styles = useStyles();
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [fileRejections, setFileRejections] = useState<RejectedFile[]>([]);

    const validators = [
        useFileTypeValidator(acceptedFileTypes),
    ];

    return (
        <div className={styles.root}>
            <FileUpload
                icon={<AttachRegular />}
                header={
                    <Text as="h5" style={{ margin: 0 }} weight="semibold">
                        Upload pictures of your pet
                    </Text>
                }
                description={<Caption1>Drag and drop files here, or click to select files</Caption1>}
                onFilesAdded={(files, rejectedFiles) => {
                    setAcceptedFiles(files);
                    setFileRejections(rejectedFiles);
                }}
                validators={validators}
                accept={acceptedFileTypes}
            />

            <div>
                {acceptedFiles.length > 0 && (
                    <Text block>Accepted files: {acceptedFiles.map((file) => file.name).join(", ")}</Text>
                )}
                {fileRejections.length > 0 && (
                    <Text block>
                        Rejected files: {fileRejections.map((rejection) => rejection.file.name).join(", ")}
                    </Text>
                )}
            </div>
        </div>
    );
};

FileTypes.parameters = {
    docs: {
        description: {
            story: dedent`
                To restrict the types of files that can be uploaded, use the \`accept\` prop to specify accepted MIME types and file extensions to customize the file selection dialog.

                In addition to the browser's built-in file type filtering, the FileUpload component includes a validator that checks the types of files when they are added via drag-and-drop or the file dialog.  
                This ensures that only files matching the specified types are accepted, providing a consistent user experience across different methods of file selection.  
                For this you can use the \`useFileTypeValidator\` hook to create a validator based on the same criteria as the \`accept\` prop.
            `,
        },
    },
};
