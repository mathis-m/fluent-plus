import {
    FileCard,
    FileUpload,
    FileUploadContent,
    RejectedFile,
    useFileTypeValidator,
} from "@fluent-plus/file-upload";
import {
    Caption1,
    Text,
    Toast,
    ToastBody,
    ToastTitle,
    Toaster,
    useId,
    useToastController,
    makeStyles,
    tokens,
    Label,
    RadioGroup,
    Radio,
    Switch,
    FluentProvider,
    webDarkTheme,
    webLightTheme,
} from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { useState, useCallback } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
        padding: tokens.spacingVerticalM,
    },
    controlsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
        padding: tokens.spacingVerticalM,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground1,
        marginBottom: tokens.spacingVerticalM,
    },
    fileCardContainer: {
        marginTop: tokens.spacingVerticalM,
    },
});

const acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"],
    "text/plain": [".txt"],
};

export const SingleFileUpload = () => {
    const styles = useStyles();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [appearance, setAppearance] = useState<"outline-dashed" | "outline-dashed-alternative" | "outline" | "outline-alternative" | "filled" | "filled-alternative">("outline-dashed");
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);

    const validators = [useFileTypeValidator(acceptedFileTypes)];

    const handleAppearanceChange = useCallback((_: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
        setAppearance(data.value as typeof appearance);
    }, []);

    const handleThemeChange = useCallback(() => {
        setIsDarkTheme(prev => !prev);
    }, []);

    const handleFilesAdded = (acceptedFiles: File[], rejectedFiles: RejectedFile[]) => {
        if (acceptedFiles.length > 0) {
            // For single file upload, take only the first file
            setSelectedFile(acceptedFiles[0]);
        }

        // Show toast notification for rejected files
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            dispatchToast(
                <Toast>
                    <ToastTitle>File Upload Error</ToastTitle>
                    <ToastBody>
                        {`File "${rejectedFile.file.name}" was rejected. Please ensure the file type is supported.`}
                    </ToastBody>
                </Toast>,
                { intent: "error", timeout: 5000 }
            );
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    return (
        <FluentProvider theme={isDarkTheme ? webDarkTheme : webLightTheme}>
            <div className={styles.root}>
                <Toaster toasterId={toasterId} />

                <div className={styles.controlsContainer}>
                    <Label size="medium" weight="semibold">
                        Controls
                    </Label>

                    <RadioGroup value={appearance} onChange={handleAppearanceChange} layout="horizontal-stacked">
                        <Radio value="outline-dashed" label="Outline Dashed" />
                        <Radio value="outline-dashed-alternative" label="Outline Dashed Alt" />
                        <Radio value="outline" label="Outline" />
                        <Radio value="outline-alternative" label="Outline Alt" />
                        <Radio value="filled" label="Filled" />
                        <Radio value="filled-alternative" label="Filled Alt" />
                    </RadioGroup>

                    <Switch checked={isDarkTheme} onChange={handleThemeChange} label="Dark theme" />
                </div>

                {/* Only show FileUpload content when no file is selected */}
                <FileUpload onFilesAdded={handleFilesAdded} validators={validators} accept={acceptedFileTypes} appearance={appearance}>
                    {!selectedFile && (
                        <FileUploadContent
                            image={<AttachRegular fontSize={44} />}
                            header={
                                <Text as="h5" style={{ margin: 0 }} weight="semibold">
                                    Upload a single file
                                </Text>
                            }
                            description={
                                <Caption1>
                                    Drag and drop a file here, or click to select a file. Supported formats: PNG,
                                    JPEG, PDF, TXT
                                </Caption1>
                            }
                        />
                    )}
                    {selectedFile && (
                        <div className={styles.fileCardContainer}>
                            <FileCard
                                file={selectedFile}
                                removeButton={{
                                    onClick: handleRemoveFile,
                                    "aria-label": "Remove file",
                                }}
                            />
                        </div>
                    )}
                </FileUpload>
            </div>
        </FluentProvider>
    );
};

SingleFileUpload.parameters = {
    docs: {
        description: {
            story: dedent`
                This story demonstrates a single file upload composition using the FileUpload and FileCard components with interactive controls.
                
                **Key Features:**
                - **Conditional Rendering**: The FileUpload content is only visible when no file is selected
                - **File Selection**: Once a file is selected, it's displayed using the FileCard component
                - **File Removal**: Users can remove the selected file using the remove button on the FileCard
                - **Error Handling**: Toast notifications are shown for file resolution errors (unsupported file types)
                - **File Type Validation**: Only accepts PNG, JPEG, PDF, and TXT files
                - **Appearance Control**: Interactive radio buttons to switch between different FileUpload appearances
                - **Theme Switching**: Toggle between light and dark themes to see how the component adapts
                
                **Interactive Controls:**
                - **Appearance Selection**: Choose from 6 different appearance options to see visual variations
                - **Theme Toggle**: Switch between light and dark themes to test component styling
                
                **User Flow:**
                1. Use the controls to customize the appearance and theme
                2. User sees the file upload area when no file is selected
                3. User drags and drops or clicks to select a single file
                4. The upload area disappears and the selected file is shown as a FileCard
                5. User can remove the file to return to the upload state
                6. If an unsupported file is selected, a toast error notification is displayed
                
                This pattern is ideal for forms or interfaces where only one file is needed at a time,
                such as profile picture uploads, document submissions, or single file attachments.
            `,
        },
    },
};
