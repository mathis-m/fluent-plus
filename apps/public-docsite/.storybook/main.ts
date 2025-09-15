import type { StorybookConfig } from "@storybook/react-vite";

import { transformAsync } from "@babel/core";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { mergeConfig } from "vite";

function babelStorybookPlugin(): Plugin {
    return {
        name: "vite-plugin-babel-storybook-full-source",
        async transform(code, id) {
            if (/\.stories\.(jsx?|tsx?)$/.test(id)) {
                const result = await transformAsync(code, {
                    filename: id,
                    plugins: ["module:@fluentui/babel-preset-storybook-full-source"],
                });
                return {
                    code: result?.code ?? code,
                    map: result?.map ?? null,
                };
            }
            return null;
        },
    };
}

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
        const test = mergeConfig(config, {
            plugins: [babelStorybookPlugin(), react(), nxViteTsPaths()],
            resolve: {
                conditions: [
                    "@fluent-plus/fluent-plus-repo",
                    "module",
                    "browser",
                    "development",
                    "import",
                    "require",
                    "default",
                ],
            },
        });
        return test;
    },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
