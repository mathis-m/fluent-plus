import { FileUpload, FileUploadContent } from "@fluent-plus/file-upload";
import {
    Caption1,
    Label,
    makeStyles,
    Radio,
    RadioGroup,
    Slider,
    Switch,
    Text,
    tokens,
} from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";
import dedent from "dedent";
import { useCallback, useState } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
    controlsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
        padding: tokens.spacingVerticalM,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground1,
    },
    resizableContainer: {
        border: `2px dashed ${tokens.colorBrandStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingVerticalXXL,
        resize: "horizontal",
        overflow: "auto",
        minWidth: "200px",
        maxWidth: "800px",
        width: "500px",
        position: "relative",
        "&::after": {
            content: '"Resize width ↔"',
            position: "absolute",
            bottom: "0px",
            right: "8px",
            fontSize: tokens.fontSizeBase200,
            color: tokens.colorNeutralForeground3,
            pointerEvents: "none",
        },
    },
    sliderContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
        minWidth: "200px",
    },
});

export const Layout = () => {
    const styles = useStyles();

    const [layout, setLayout] = useState<"horizontal" | "vertical" | "best-fit">("best-fit");
    const [description, setDescription] = useState<string | undefined>(
        "Start by dragging and dropping files here!"
    );
    const [bestFitThreshold, setBestFitThreshold] = useState<number>(400);

    const toggleDescription = () => {
        setDescription((prevDescription) =>
            prevDescription ? undefined : "Start by dragging and dropping files here!"
        );
    };

    const handleLayoutChange = useCallback((_: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
        setLayout(data.value as "horizontal" | "vertical" | "best-fit");
    }, []);

    const handleThresholdChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, data: { value: number }) => {
            setBestFitThreshold(data.value);
        },
        []
    );

    return (
        <div className={styles.root}>
            <div className={styles.controlsContainer}>
                <Label size="medium" weight="semibold">
                    Layout Controls
                </Label>

                <RadioGroup value={layout} onChange={handleLayoutChange} layout="horizontal">
                    <Radio value="horizontal" label="Horizontal" />
                    <Radio value="vertical" label="Vertical" />
                    <Radio value="best-fit" label="Best Fit (Responsive)" />
                </RadioGroup>

                <Switch checked={!!description} onChange={toggleDescription} label="Show description" />

                {layout === "best-fit" && (
                    <div className={styles.sliderContainer}>
                        <Label>Best Fit Threshold: {bestFitThreshold}px</Label>
                        <Slider
                            min={200}
                            max={800}
                            step={25}
                            value={bestFitThreshold}
                            onChange={handleThresholdChange}
                        />
                        <Caption1>
                            The component switches to vertical layout when width is below this threshold.
                            <br />
                            <strong>Note:</strong> Changes to this value do not immediately refresh the
                            layout.{" "}
                            <strong>
                                The new threshold only takes effect when the component is resized.
                            </strong>
                        </Caption1>
                    </div>
                )}
            </div>

            <div className={styles.resizableContainer}>
                <FileUpload
                    contentLayout={layout}
                    bestFitThreshold={layout === "best-fit" ? bestFitThreshold : undefined}>
                    <FileUploadContent
                        image={<AttachRegular fontSize={44} />}
                        header={
                            <Text as="h5" style={{ margin: 0 }} weight="semibold">
                                {description ? "Upload your files" : "Drag and drop your file to upload"}
                            </Text>
                        }
                        description={description ? <Caption1>{description}</Caption1> : undefined}
                    />
                </FileUpload>
            </div>
        </div>
    );
};

Layout.parameters = {
    docs: {
        description: {
            story: dedent`
                The FileUpload component supports three layout options: horizontal, vertical, and best-fit (responsive).
                
                - **Horizontal**: Ideal for wider but more condensed spaces with image, select button and content side by side
                - **Vertical**: Works well in taller, more spacious areas with image above the content and select button below content
                - **Best-fit**: Automatically switches between horizontal and vertical layouts based on the component's width
                
                The best-fit option uses ResizeObserver to dynamically determine the optimal layout. You can customize the threshold (default 400px) - when the component width is below this value, it switches to vertical layout.
                
                **Important Note**: Changes to the bestFitThreshold value do not immediately refresh the layout. The new threshold only takes effect when the component is resized (either by the user or programmatically).
                
                **Interactive Demo Features:**
                - Use the radio buttons to switch between layout modes
                - Toggle the description to see how it affects the layout
                - For best-fit mode, adjust the threshold slider to control when the layout switches
                - Drag the bottom-right corner of the dashed container to resize and see responsive behavior
                
                Try resizing the container with different threshold values to explore how the component adapts to different widths!
            `,
        },
    },
};
