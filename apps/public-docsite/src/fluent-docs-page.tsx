import {
    Divider,
    makeStyles,
    SelectTabData,
    SelectTabEvent,
    shorthands,
    Tab,
    TabList,
    tokens,
    useEventCallback,
} from "@fluentui/react-components";
import {
    ArgTypes,
    Description,
    DocsContext,
    DocsContextProps,
    HeaderMdx,
    Primary,
    Stories,
    Subtitle,
    Title,
} from "@storybook/addon-docs/blocks";
import * as React from "react";
import { PreparedStory, Renderer } from "storybook/internal/types";
import { nameToHash, Toc } from "./toc";

// TAKEN FROM: https://github.com/microsoft/fluentui/blob/5ede7c79a0708becb554011efcd6007991185034/apps/public-docsite-v9/src/DocsComponents/FluentDocsPage.stories.tsx

type PrimaryStory = PreparedStory<Renderer>;

const useStyles = makeStyles({
    divider: {
        height: "1px",
        backgroundColor: "#e1dfdd",
        ...shorthands.border("0px", "none"),
        ...shorthands.margin("48px", "0px"),
    },
    wrapper: {
        display: "flex",
        ...shorthands.gap("16px"),
    },
    toc: {
        flexBasis: "200px",
        flexShrink: 0,
        [`@media screen and (max-width: 1000px)`]: {
            display: "none",
        },
    },
    container: {
        // without a width, this div grows wider than its parent
        width: "200px",
        flexGrow: 1,
    },
    description: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        "& > *": {
            maxWidth: "100%",
        },
    },
});

const useArgTypesStyles = makeStyles({
    divider: {
        paddingTop: tokens.spacingVerticalM,
    },
});

const RenderPrimaryStory = ({ primaryStory }: { primaryStory: PrimaryStory }) => {
    const styles = useStyles();
    return (
        <>
            <hr className={styles.divider} />
            <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
                {primaryStory.name}
            </HeaderMdx>
            <Primary />
        </>
    );
};

const AllComponentArgs = ({ primaryStory }: { primaryStory: PrimaryStory }) => {
    const hasPrimaryStoryArgs = Object.keys(primaryStory.argTypes).length > 0;

    const styles = useArgTypesStyles();

    const primaryComponentName = primaryStory.component?.displayName ?? primaryStory.component?.name;

    const [selectedValue, setSelectedValue] = React.useState<string>(primaryComponentName);
    const onTabSelect = useEventCallback((event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(`${data.value}`);
    });

    if (!hasPrimaryStoryArgs) {
        return null;
    }

    if (!primaryStory.subcomponents || Object.keys(primaryStory.subcomponents).length === 0) {
        return <ArgTypes of={primaryStory.component} />;
    }

    const allComponents: Record<string, unknown> = {
        [primaryComponentName]: primaryStory.component,
        ...primaryStory.subcomponents,
    };

    return (
        <>
            <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} size={"small"}>
                {Object.entries(allComponents).map(([name, component]) => (
                    <Tab key={name} id={name} value={name}>
                        {name}
                    </Tab>
                ))}
            </TabList>
            <Divider className={styles.divider} />
            <ArgTypes of={allComponents[selectedValue]} />
        </>
    );
};

export const FluentDocsPage = () => {
    const context = React.useContext(DocsContext);
    const stories = context.componentStories();

    const primaryStory = stories[0];

    assertStoryMetaValues(primaryStory);

    const styles = useStyles();

    return (
        <div className="sb-unstyled">
            <Title />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Subtitle />
                    <div className={styles.description}>
                        <Description />
                    </div>
                    <RenderPrimaryStory primaryStory={primaryStory} />
                    <AllComponentArgs primaryStory={primaryStory} />

                    <Stories includePrimary={!primaryStory.parameters.formWrapper} />
                </div>
                <div className={styles.toc}>
                    <Toc stories={stories} />
                </div>
            </div>
        </div>
    );
};

function assertStoryMetaValues(story: ReturnType<DocsContextProps["componentStories"]>[number]) {
    if (story.component === null) {
        throw new Error(
            [
                "🚨 Invalid Story Meta declaration:",
                `- primaryStory.component of componentId:${story.componentId} is "null"`,
                '- to resolve this error, please update "component" property value in your story definition to reference a React Component or remove it if it is not needed.',
            ].join("\n")
        );
    }
}

