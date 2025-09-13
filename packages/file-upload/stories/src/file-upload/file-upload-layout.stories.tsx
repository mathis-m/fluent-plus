import { FileUpload } from "@fluent-plus/file-upload";
import { Caption1, makeStyles, Switch, Text, tokens } from "@fluentui/react-components";
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

export const Layout = () => {
    const styles = useStyles();

    const [layout, setLayout] = useState<"horizontal" | "vertical">("vertical");
    const [description, setDescription] = useState<string | undefined>(
        "Start by dragging and dropping files here!"
    );

    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "horizontal" ? "vertical" : "horizontal"));
    };

    const toggleDescription = () => {
        setDescription((prevDescription) =>
            prevDescription ? undefined : "Start by dragging and dropping files here!"
        );
    };

    return (
        <div className={styles.root}>
            <Switch checked={layout === "vertical"} onChange={toggleLayout} label={"Vertical layout"} />
            <Switch checked={!!description} onChange={toggleDescription} label={"Show description"} />
            <FileUpload
                icon={<AttachRegular />}
                header={
                    <Text as="h5" style={{ margin: 0 }} weight="semibold">
                        {description ? "Upload your files" : "Drag and drop your file to upload"}
                    </Text>
                }
                contentLayout={layout}
                description={description ? <Caption1>{description}</Caption1> : undefined}
            />
        </div>
    );
};

Layout.parameters = {
    docs: {
        description: {
            story: dedent`
                The FileUpload component supports two layout options: horizontal (default) and vertical. Icon size adjusts based on the selected layout and the presence of a description.
                
                The horizontal layout is ideal for wider but more condensed spaces, while the vertical layout works well in taller, more spacious areas.
                You can also choose to include or exclude the description based on your design needs.
            `,
        },
    },
};
