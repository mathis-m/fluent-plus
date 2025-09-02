import { defaultDependencies, fixVersionsForDependencies } from "../constants";
import { FileDefinitionFactory } from "./file-definiton-factory";

const importPathRegex = /from ['"]([^'"]+)['"]/g;

export const packageJson: FileDefinitionFactory = (context) => {
    const allImports = Array.from(context.fullStorySourceCode.matchAll(importPathRegex))
        .map((m) => m?.[1] ?? "")
        .filter((p) => !p.startsWith(".") && !p.startsWith("/") && !!p);

    const dependencies = Array.from(new Set(allImports)).reduce<Record<string, string>>(
        (deps, importPath) => {
            deps[importPath] = fixVersionsForDependencies[importPath] ?? "latest";
            return deps;
        },
        {}
    );

    return {
        fileName: "package.json",
        content: JSON.stringify(
            {
                name: "fluent-plus-sandbox",
                version: "0.0.0",
                private: true,
                type: "module",
                scripts: {
                    dev: "vite",
                    build: "tsc && vite build",
                    preview: "vite preview",
                },
                dependencies: {
                    ...dependencies,
                    ...defaultDependencies,
                },
                devDependencies: {
                    "@vitejs/plugin-react": "^4.2.0",
                    vite: "^5.0.0",
                    "@types/react": "^18",
                    "@types/react-dom": "^18",
                    typescript: "~5.8.2",
                },
            },
            null,
            2
        ),
    };
};
