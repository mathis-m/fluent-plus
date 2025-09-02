import { FileDefinition, FileDefinitionFactory } from "./file-definiton-factory";

export const srcAppTsx: FileDefinitionFactory = (context) => ({
    fileName: "src/app.tsx",
    content: `import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ${context.storyFunctionExportToken} } from './example';

const App = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <${context.storyFunctionExportToken} />
        </FluentProvider>
    );
};

export default App;
`,
});