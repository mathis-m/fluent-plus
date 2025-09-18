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

export const Appearance = () => {
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
                        <FileUpload appearance={key}>
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
                        <FileUpload appearance={key}>
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

Appearance.parameters = {
    docs: {
        description: {
            story: dedent`
                The FileUpload component supports multiple appearance options to match different design requirements:

                - **outline-dashed (default)**: Combines a transparent background with a dashed border and no shadow for a distinctive visual style.
                - **outline-dashed-alternative**: Similar to outline-dashed but without background color for enhanced contrast.
                - **outline**: Features a transparent background with no shadow, providing a clean, minimal look.
                - **outline-alternative**: Similar to outline appearance but without background color for enhanced contrast.
                - **filled**: The component has a shadow and background color for a prominent, elevated appearance.
                - **filled-alternative**: Similar to filled but with a slightly darker background color for enhanced contrast.
                
                Choose the appearance that best fits your application's design system and visual hierarchy.
            `,
        },
    },
};
