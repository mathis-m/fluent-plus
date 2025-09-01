import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
    theme: create({
        base: "light",

        // Storybook-specific color palette
        colorPrimary: "rgba(255, 255, 255, .4)",
        colorSecondary: "#0078d4",

        // UI
        appBg: "#ffffff",
        appContentBg: "#ffffff",
        appBorderColor: "#e0e0e0", // use msft gray
        appBorderRadius: 4,

        // Fonts
        fontBase:
            '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
        fontCode: "monospace",

        // Text colors
        textColor: "#11100f",
        textInverseColor: "#0078d4", // use msft primary blue default

        // Toolbar default and active colors
        barSelectedColor: "#0078d4", // use msft primary blue default

        // Form colors
        inputBorderRadius: 4,

        brandTitle: "FluentPlus",
        brandTarget: "_self",
    }),
    enableShortcuts: false,
    showPanel: false,
    showToolbar: false,
});
