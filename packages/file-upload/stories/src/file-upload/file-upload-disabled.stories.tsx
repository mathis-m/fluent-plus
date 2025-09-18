import { FileUpload, FileUploadContent } from "@fluent-plus/file-upload";
import { Caption1, FluentProvider, makeStyles, Text, webDarkTheme } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    themeContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
    },
});

export const Disabled = () => {
    const appearances = [
        { key: "outline-dashed", label: "Outline Dashed" },
        { key: "outline-dashed-alternative", label: "Outline Dashed Alternative" },
        { key: "outline", label: "Outline" },
        { key: "outline-alternative", label: "Outline Alternative" },
        { key: "filled", label: "Filled" },
        { key: "filled-alternative", label: "Filled Alternative" },
    ] as const;
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.themeContainer}>
                {appearances.map(({ key, label }) => (
                    <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <Text weight="semibold">{label}</Text>
                        <FileUpload
                            disabled
                            appearance={key}
                            onFilesAdded={(acceptedFiles, rejectedFiles) => {
                                console.log("Accepted files:", acceptedFiles);
                                console.log("Rejected files:", rejectedFiles);
                            }}
                        >
                            <FileUploadContent
                                image={<AttachRegular fontSize={44} />}
                                header={
                                    <Text as="h5" style={{ margin: 0 }} weight="semibold">
                                        Upload your files
                                    </Text>
                                }
                                description={
                                    <Caption1>Drag and drop files here, or click to select files</Caption1>
                                }
                            />
                        </FileUpload>
                    </div>
                ))}
            </div>

            <FluentProvider theme={webDarkTheme} className={styles.themeContainer}>
                {appearances.map(({ key, label }) => (
                    <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <Text weight="semibold">{label}</Text>
                        <FileUpload
                            disabled
                            appearance={key}
                            onFilesAdded={(acceptedFiles, rejectedFiles) => {
                                console.log("Accepted files:", acceptedFiles);
                                console.log("Rejected files:", rejectedFiles);
                            }}
                        >
                            <FileUploadContent
                                image={<AttachRegular fontSize={44} />}
                                header={
                                    <Text as="h5" style={{ margin: 0 }} weight="semibold">
                                        Upload your files
                                    </Text>
                                }
                                description={
                                    <Caption1>Drag and drop files here, or click to select files</Caption1>
                                }
                            />
                        </FileUpload>
                    </div>
                ))}
            </FluentProvider>
        </div>
    );
};

Disabled.parameters = {
    docs: {
        description: {
            story: dedent`
                The FileUpload component can be disabled by setting the \`disabled\` prop to \`true\`. 
                When disabled, the component becomes non-interactive - users cannot drag and drop files, 
                click to select files, or interact with any of the component's functionality. 
                The disabled state provides visual feedback to indicate that the file upload functionality 
                is temporarily unavailable, while maintaining the component's layout and accessibility features.
                
                This story demonstrates the disabled state across all available appearances in both light and dark themes.
                Notice how the disabled state maintains the overall design while clearly indicating the component is not interactive.
                
                This is useful in scenarios such as:
                - During form validation when certain conditions aren't met
                - While files are being processed or uploaded
                - When user permissions don't allow file uploads
                - During loading states or when the application is in read-only mode
            `,
        },
    },
};