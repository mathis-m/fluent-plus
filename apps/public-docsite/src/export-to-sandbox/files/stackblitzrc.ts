import { FileDefinitionFactory } from "./file-definiton-factory";

export const stackblitzrc: FileDefinitionFactory = (context) => ({
    fileName: ".stackblitzrc",
    content: `{}`,
});
