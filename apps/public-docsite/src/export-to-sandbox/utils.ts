import { type StoryContext } from "@storybook/react-vite";
import { fileFactories } from "./files";
import { FileFactoryContext } from "./files/file-definiton-factory";

export function setupExportToSandboxButton(context: StoryContext) {
    // First, check if the button already exists to avoid duplicates
    // If it exists, we destroy it and recreate it

    const storyContainers = getStoryRelatedContainers(context.id);
    for (const container of storyContainers) {
        const showCodeButton = getShowCodeButton(container);
        if (!showCodeButton) continue;

        removeExistingExportToSandboxButton(container);

        const exportToSandboxButton = createExportToSandboxButtonBasedOn(showCodeButton);
        showCodeButton.parentElement?.prepend(exportToSandboxButton);

        setupClickHandler(exportToSandboxButton, context);
    }
}

/**
 * As we render the default story two times, we need to return a list of containers
 * that are related to the current story.
 */
function getStoryRelatedContainers(id: string) {
    return Array.from(document.querySelectorAll(`#anchor--${id}`)) as HTMLDivElement[];
}

function getShowCodeButton(storyContainer: HTMLDivElement) {
    return storyContainer.querySelector(
        ".docblock-code-toggle:not(.with-code-sandbox-button)"
    ) as HTMLDivElement | null;
}

function createExportToSandboxButtonBasedOn(showCodeButton: HTMLDivElement) {
    const classList = Array.from(showCodeButton.classList);
    const uniqueClassSet = new Set(classList);
    uniqueClassSet.add("with-code-sandbox-button");

    const exportButton = document.createElement("button");
    exportButton.textContent = "Open in CodeSandbox";
    exportButton.classList.add(...Array.from(uniqueClassSet));

    return exportButton;
}

function removeExistingExportToSandboxButton(storyContainer: HTMLDivElement) {
    const existingButton = storyContainer.querySelectorAll(".with-code-sandbox-button");
    existingButton.forEach((button) => button.remove());
}

function setupClickHandler(exportToSandboxButton: HTMLButtonElement, context: StoryContext) {
    const fullSource = context.parameters.fullSource ?? "";

    const firstExportName = fullSource.match(/export (const|function) (\w+)/)?.[2] ?? "Default";

    const fileFactoryContext: FileFactoryContext = {
        storyFunctionExportToken: firstExportName,
        fullStorySourceCode: fullSource,
    };


    const files = fileFactories.map((factory) => factory(fileFactoryContext));

    exportToSandboxButton.addEventListener("click", () => {
        const form = document.createElement("form");
        form.method = "post";
        form.target = "_blank";
        form.action = `https://stackblitz.com/run?file=${encodeURIComponent("src/example.tsx")}`;

        createHiddenInput(form, "project[template]", "node");
        createHiddenInput(form, "project[title]", `Fluent Plus Sandbox - ${context.title}`);
        createHiddenInput(form, "project[description]", `# ${context.parameters.docs?.description?.story ?? "Fluent Plus Sandbox"}`);

        for (const file of files) {
            createHiddenInput(form, `project[files][${file.fileName}]`, file.content);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    });
}

function createHiddenInput(form: HTMLFormElement, name: string, value: string) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
}
