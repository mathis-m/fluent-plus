import { FileDefinitionFactory } from "./file-definiton-factory";

export const tsconfigNodeJson: FileDefinitionFactory = () => ({
    fileName: "tsconfig.node.json",
    content: `{
      "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true
      },
      "include": ["vite.config.ts"]
}`,
});
