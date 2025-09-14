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
    addons: ["@storybook/addon-docs"],
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
    core: {
        builder: "@storybook/builder-vite", // 👈 The builder enabled here.
    },
    viteFinal: async (config, options) => {
        debugger;
        const test = mergeConfig(config, {
            plugins: [
                react({
                    babel: {
                        plugins: ["module:@fluentui/babel-preset-storybook-full-source"],
                    },
                }),
                nxViteTsPaths(),
            ],
        });
        debugger;
        return test;
    },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
