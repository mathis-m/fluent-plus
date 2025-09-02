import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import type { Preview } from "@storybook/react";
import type { StoryContextForEnhancers } from "storybook/internal/csf";
import { FluentDocsContainer } from "../src/fluent-docs-container";
import { FluentDocsPage } from "../src/fluent-docs-page";
import { exportToSandboxDecorator } from "../src/export-to-sandbox";
import "./docs-root.css";

const preview: Preview = {
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            return (
                <FluentProvider theme={webLightTheme}>
                    <Story />
                </FluentProvider>
            );
        },
        exportToSandboxDecorator
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
        exportToSandbox: {
            provider: "stackblitz-cloud",
            bundler: "vite",
            requiredDependencies: {
                // for React
                react: "^18",
                "react-dom": "^18",
                // necessary for FluentProvider:
                "@fluentui/react-components": "^9.0.0",
            },
            optionalDependencies: {
                "@fluentui/react-icons": "latest",
            },
        },
    },
};

export default preview;
