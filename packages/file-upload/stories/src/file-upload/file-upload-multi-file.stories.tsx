import {
    FileCard,
    FileUpload,
    FileUploadContent,
    RejectedFile,
    useFileTypeValidator,
} from "@fluent-plus/file-upload";
import {
    Caption1,
    FluentProvider,
    Label,
    Radio,
    RadioGroup,
    Switch,
    Text,
    Toast,
    ToastBody,
    ToastTitle,
    Toaster,
    makeStyles,
    tokens,
    useId,
    useToastController,
    webDarkTheme,
    webLightTheme,
} from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { useCallback, useState } from "react";

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
    fileCardsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
        marginTop: tokens.spacingVerticalM,
    },
    fileCardsHeader: {
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
        paddingBottom: tokens.spacingVerticalS,
    },
});

const acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"],
    "text/plain": [".txt"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/msword": [".doc"],
};

const initialFieles: File[] = [
    new File(["file content"], "example.txt", { type: "text/plain", lastModified: Date.now() }),
    new File(["file content"], "example.pdf", { type: "application/pdf", lastModified: Date.now() }),
    new File(["file content"], "example.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        lastModified: Date.now(),
    }),
];

export const MultiFileUpload = () => {
    const styles = useStyles();
    const [selectedFiles, setSelectedFiles] = useState<File[]>(initialFieles);
    const [appearance, setAppearance] = useState<
        | "outline-dashed"
        | "outline-dashed-alternative"
        | "outline"
        | "outline-alternative"
        | "filled"
        | "filled-alternative"
    >("outline-dashed");
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);

    const validators = [useFileTypeValidator(acceptedFileTypes)];

    const handleAppearanceChange = useCallback(
        (_: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
            setAppearance(data.value as typeof appearance);
        },
        []
    );

    const handleThemeChange = useCallback(() => {
        setIsDarkTheme((prev) => !prev);
    }, []);

    const handleFilesAdded = (acceptedFiles: File[], rejectedFiles: RejectedFile[]) => {
        if (acceptedFiles.length > 0) {
            // Add new files to the existing list, avoiding duplicates
            setSelectedFiles((prevFiles) => {
                const existingNames = prevFiles.map((file) => file.name);
                // Prevent duplicates by name, and add "(n+1)" suffix if name already exists
                const nameCounts = existingNames.reduce<Record<string, number>>((acc, name) => {
                    acc[name] = (acc[name] || 0) + 1;
                    return acc;
                }, {});
                const newFiles = acceptedFiles
                    .map((file) => {
                        let baseName = file.name;
                        let ext = "";
                        const dotIdx = file.name.lastIndexOf(".");
                        if (dotIdx > 0) {
                            baseName = file.name.slice(0, dotIdx);
                            ext = file.name.slice(dotIdx);
                        }
                        let name = file.name;
                        if (existingNames.includes(file.name)) {
                            let n = nameCounts[file.name] || 1;
                            // Find next available suffix
                            do {
                                n++;
                                name = `${baseName} (${n})${ext}`;
                            } while (existingNames.includes(name));
                            nameCounts[file.name] = n;
                            // Create a new File object with the new name
                            return new File([file], name, {
                                type: file.type,
                                lastModified: file.lastModified,
                            });
                        } else {
                            nameCounts[file.name] = 1;
                            return file;
                        }
                    })
                    .filter((file) => !existingNames.includes(file.name));
                return [...prevFiles, ...newFiles];
            });
        }

        // Show toast notification for rejected files
        if (rejectedFiles.length > 0) {
            const rejectedFileNames = rejectedFiles.map((r) => r.file.name);
            dispatchToast(
                <Toast>
                    <ToastTitle>File Upload Error</ToastTitle>
                    <ToastBody>
                        {rejectedFiles.length === 1
                            ? `File "${rejectedFileNames[0]}" was rejected. Please ensure the file type is supported.`
                            : `${rejectedFiles.length} files were rejected: ${rejectedFileNames.join(
                                  ", "
                              )}. Please ensure all file types are supported.`}
                    </ToastBody>
                </Toast>,
                { intent: "error", timeout: 5000 }
            );
        }
    };

    const handleRemoveFile = (fileToRemove: File) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileToRemove.name || file.size !== fileToRemove.size)
        );
    };

    return (
        <FluentProvider theme={isDarkTheme ? webDarkTheme : webLightTheme}>
            <div className={styles.root}>
                <Toaster toasterId={toasterId} />

                <div className={styles.controlsContainer}>
                    <Label size="medium" weight="semibold">
                        Controls
                    </Label>

                    <RadioGroup
                        value={appearance}
                        onChange={handleAppearanceChange}
                        layout="horizontal-stacked">
                        <Radio value="outline-dashed" label="Outline Dashed" />
                        <Radio value="outline-dashed-alternative" label="Outline Dashed Alt" />
                        <Radio value="outline" label="Outline" />
                        <Radio value="outline-alternative" label="Outline Alt" />
                        <Radio value="filled" label="Filled" />
                        <Radio value="filled-alternative" label="Filled Alt" />
                    </RadioGroup>

                    <Switch checked={isDarkTheme} onChange={handleThemeChange} label="Dark theme" />
                </div>

                {/* FileUpload is always visible for multi-file upload */}
                <FileUpload
                    onFilesAdded={handleFilesAdded}
                    validators={validators}
                    accept={acceptedFileTypes}
                    appearance={appearance}>
                    <FileUploadContent
                        image={<AttachRegular fontSize={44} />}
                        header={
                            <Text as="h5" style={{ margin: 0 }} weight="semibold">
                                Upload multiple files
                            </Text>
                        }
                        description={
                            <Caption1>
                                Drag and drop files here, or click to select multiple files. Supported
                                formats: PNG, JPEG, PDF, TXT, DOC, DOCX
                            </Caption1>
                        }
                    />
                    {selectedFiles.length > 0 && (
                        <div className={styles.fileCardsContainer}>
                            <div className={styles.fileCardsHeader}>
                                <Text weight="semibold">Selected Files ({selectedFiles.length})</Text>
                            </div>
                            {selectedFiles.map((file, index) => (
                                <FileCard
                                    key={`${file.name}-${file.size}-${index}`}
                                    file={file}
                                    removeButton={{
                                        onClick: () => handleRemoveFile(file),
                                        "aria-label": `Remove ${file.name}`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </FileUpload>
            </div>
        </FluentProvider>
    );
};

MultiFileUpload.parameters = {
    docs: {
        description: {
            story: dedent`
                This story demonstrates a multi-file upload composition using the FileUpload and FileCard components with interactive controls.
                
                **Key Features:**
                - **Always Visible Upload Area**: The FileUpload content remains visible to allow adding more files
                - **Multiple File Selection**: Users can select multiple files at once or add files incrementally
                - **File Cards Display**: All selected files are displayed as FileCard components below the upload area
                - **Individual File Removal**: Each file can be removed independently using its remove button
                - **Error Handling**: Toast notifications are shown for file resolution errors with detailed messages
                - **File Type Validation**: Accepts PNG, JPEG, PDF, TXT, DOC, and DOCX files
                - **Duplicate Prevention**: Prevents adding files with the same name by adding numbered suffixes
                - **Appearance Control**: Interactive radio buttons to switch between different FileUpload appearances
                - **Theme Switching**: Toggle between light and dark themes to see how the component adapts
                - **Initial Files**: Pre-loaded with sample files to demonstrate the file cards display
                
                **Interactive Controls:**
                - **Appearance Selection**: Choose from 6 different appearance options to see visual variations
                - **Theme Toggle**: Switch between light and dark themes to test component styling
                
                **User Flow:**
                1. Use the controls to customize the appearance and theme
                2. User sees the file upload area which remains visible throughout the process
                3. User drags and drops or clicks to select one or multiple files
                4. Selected files appear as FileCards below the upload area with a header showing the count
                5. User can continue adding more files using the same upload area
                6. User can remove individual files using the remove button on each FileCard
                7. If unsupported files are selected, detailed toast error notifications are displayed
                
                This pattern is ideal for scenarios where multiple files are needed, such as:
                - Document collections for applications
                - Multiple image uploads for galleries
                - Batch file processing workflows
                - Project file submissions requiring various document types
            `,
        },
    },
};
