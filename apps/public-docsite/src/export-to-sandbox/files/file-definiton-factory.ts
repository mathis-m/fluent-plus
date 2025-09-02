export type FileFactoryContext = {
    storyFunctionExportToken: string;
    fullStorySourceCode: string;
}

export type FileDefinitionFactory = (context: FileFactoryContext) => FileDefinition;

export interface FileDefinition {
    fileName: string;
    content: string;
}