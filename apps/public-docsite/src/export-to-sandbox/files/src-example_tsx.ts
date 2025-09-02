import { FileDefinitionFactory } from "./file-definiton-factory";

export const srcExampleTsx: FileDefinitionFactory = (context) => ({
    fileName: "src/example.tsx",
    content: context.fullStorySourceCode
});