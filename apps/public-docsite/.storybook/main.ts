import type { StorybookConfig } from "@storybook/react-vite";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";

const identity = <T>(value: T) => value;
const defaultOptions = {
    webpackRule: {},
    babelLoaderOptionsUpdater: identity,
};
const config: StorybookConfig = {
    stories: [
        "../../../packages/**/stories/**/index.@(mdx|stories.@(js|jsx|ts|tsx))",
        "../../../packages/**/stories/**/*.mdx",
        "../src/**/*.mdx",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    staticDirs: ["./public"],
    typescript: {
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            savePropValueAsString: true,
            include: [
                "**/*.tsx",
                "**/*.ts",
                "../../../packages/**/*.ts",
                "../../../packages/**/*.tsx",
                "../../../packages/**/*.mdx",
            ],
            tsconfigPath: "../tsconfig.storybook.json",
        },
    },
    docs: {
        docsMode: true,
    },
    viteFinal: async (config, options) => {
        return mergeConfig(config, {
            plugins: [
                react({
                    babel: {
                        overrides: [
                            {
                                test: /\.stories\.(jsx?$|tsx?$)/,
                                plugins: [
                                    [
                                        require.resolve("@fluentui/babel-preset-storybook-full-source"),
                                        defaultOptions,
                                    ],
                                ],
                            },
                        ],
                    },
                }),
                nxViteTsPaths(),
            ],
        });
    },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
