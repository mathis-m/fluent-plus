import { FileUpload, FileUploadContent, FileUploadUtils } from "@fluent-plus/file-upload";
import { Caption1, Link, makeStyles, Text, tokens } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { useRef } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
});

export const SelectFilesButton = () => {
    const styles = useStyles();

    const fileUploadRef = useRef<FileUploadUtils>(null);

    return (
        <div className={styles.root}>
            <FileUpload>
                <FileUploadContent
                    image={<AttachRegular fontSize={44} />}
                    header={
                        <Text as="h5" style={{ margin: 0 }} weight="semibold">
                            Customize the props of the Fluent UI Button used to open the file dialog
                        </Text>
                    }
                    description={
                        <Caption1>Drag and drop files here, or click the button to select files</Caption1>
                    }
                    selectFilesButton={{
                        children: "Select pictures of your pet",
                    }}
                />
            </FileUpload>
            <FileUpload fileUploadRef={fileUploadRef}>
                <FileUploadContent
                    image={<AttachRegular fontSize={44} />}
                    header={
                        <Text as="h5" style={{ margin: 0 }} weight="semibold">
                            Integrate the file dialog button in your own UI
                        </Text>
                    }
                    description={
                        <Caption1>
                            Drag and drop files here, or{" "}
                            <Link onClick={() => fileUploadRef.current?.openFileSelectionDialog()}>
                                click to select files
                            </Link>
                        </Caption1>
                    }
                    selectFilesButton={null}
                />
            </FileUpload>
            
            <FileUpload
                fileUploadRef={fileUploadRef}
                openFileSelectionOnGlobalClick
            >
                <FileUploadContent
                    image={<AttachRegular fontSize={44} />}
                    header={
                        <Text as="h5" style={{ margin: 0 }} weight="semibold">
                            Use the whole FileUpload component as button to open the file dialog
                        </Text>
                    }
                    description={
                        <Caption1>
                            Drag and drop files here, or click anywhere in this box to select files
                        </Caption1>
                    }
                />
            </FileUpload>
        </div>
    );
};

SelectFilesButton.parameters = {
    docs: {
        description: {
            story: dedent`
                The FileUpload provides a slot \`selectFilesButton\` to customize the button that opens the file dialog.  

                This provides flexibility to match the button's appearance with your application's design system.  
                And allows you to place the button in a different location within or outside the FileUpload component.

                You can use the \`fileUploadRef\` prop to get a reference to the FileUpload's imperative API, which includes the method \`openFileSelectionDialog\`.  
                This allows you to trigger the file dialog from any UI element, such as a link or a custom button, providing greater flexibility in your user interface design.

                In addition, you can use the \`openFileSelectionOnGlobalClick\` prop to make the entire FileUpload component clickable, which will open the file dialog when any part of the component is clicked.  
                This will also hide the default select files button, allowing for a cleaner design while still providing an intuitive way for users to select files.
            `,
        },
    },
};
