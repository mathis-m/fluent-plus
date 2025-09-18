import { FileUpload, FileUploadContent, FileUploadProps, RejectedFile, useFileTypeValidator } from "@fluent-plus/file-upload";
import { Caption1, makeStyles, Text, tokens } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
});

const imageFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
};

const pdfFileTypes = {
    "application/pdf": [".pdf"],
};

const CustomFileUpload = (props: {
    acceptedFileTypes?: Record<string, readonly string[]>;
    header: string;
    description: string;
    dropIndicationType?: FileUploadProps["dropIndicationType"];
}) => {
    const styles = useStyles();
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [fileRejections, setFileRejections] = useState<RejectedFile[]>([]);

    const validators = [useFileTypeValidator(props.acceptedFileTypes ?? {})];

    return (
        <div className={styles.root}>
            <FileUpload
                onFilesAdded={(files, rejectedFiles) => {
                    setAcceptedFiles(files);
                    setFileRejections(rejectedFiles);
                }}
                validators={validators}
                accept={props.acceptedFileTypes}
                dropIndicationType={props.dropIndicationType}
            >
                <FileUploadContent
                    image={<AttachRegular fontSize={44} />}
                    header={
                        <Text as="h5" style={{ margin: 0 }} weight="semibold">
                            {props.header}
                        </Text>
                    }
                    description={<Caption1>{props.description}</Caption1>}
                />
            </FileUpload>

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

export const DropIndication = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <CustomFileUpload
                header="Indication always visible (default)"
                description="Drag and drop any files here, or click to select files"
            />
            <CustomFileUpload
                header="No indication"
                description="Drag and drop any files here, or click to select files"
                dropIndicationType="none"
            />
            <CustomFileUpload
                header="Only show indication when some files are accepted"
                description="Accepted file types: .png, .jpg, .jpeg"
                dropIndicationType="some-accepted"
                acceptedFileTypes={imageFileTypes}
            />
            <CustomFileUpload
                header="Only show indication when all files are accepted"
                description="Accepted file types: .pdf"
                dropIndicationType="all-accepted"
                acceptedFileTypes={pdfFileTypes}
            />
        </div>
    );
};

DropIndication.parameters = {
    docs: {
        description: {
            story: dedent`
                To give the user visual feedback when dragging files into the browser, the \`dropIndicationType\` prop can be used to control when the drop indication is shown. The available options are:
                - **always** (default): The drop indication is always visible, providing a consistent visual cue for users.
                - **none**: No drop indication is shown, which may be suitable for minimalist designs or when the context is clear.
                - **some-accepted**: The drop indication appears only when some of the dragged files are of accepted types, helping users understand which files can be uploaded.
                - **all-accepted**: The drop indication is shown only when all dragged files are of accepted types, ensuring users are aware of the upload criteria.
            `,
        },
    },
};
