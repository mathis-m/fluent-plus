import {makeDecorator} from "storybook/preview-api"

import { setupExportToSandboxButton } from "./utils";

export const exportToSandboxDecorator = makeDecorator({
    name: "Export To Sandbox Button Decorator",
    parameterName: "exportToSandboxDecorator",
    wrapper: (storyFn, context) => {
        debugger
        if (context.viewMode === "docs") {
            setupExportToSandboxButton(context);
        }

        return storyFn(context);
    }
})