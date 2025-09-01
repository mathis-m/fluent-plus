import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import type { StoryContextForEnhancers } from "storybook/internal/csf";
import type { Preview } from "@storybook/react";
import { FluentDocsContainer } from "../src/fluent-docs-container";
import { FluentDocsPage } from "../src/fluent-docs-page";

const preview: Preview = {
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            debugger
            return (
                <FluentProvider theme={webLightTheme}>
                    <Story />
                </FluentProvider>
            );
        },
    ],
    parameters: {
        viewMode: "docs",
        controls: {
            disable: true,
            expanded: true,
        },
        options: {
            storySort: {
                method: "alphabetical",
            },
        },
        docs: {
            container: FluentDocsContainer,
            page: FluentDocsPage,
            source: {
                excludeDecorators: true,
                type: "code",

                transform: (source: string, storyContext: StoryContextForEnhancers) => {
                    return storyContext.parameters.fullSource;
                },
            },
        },
    },
};

export default preview;
