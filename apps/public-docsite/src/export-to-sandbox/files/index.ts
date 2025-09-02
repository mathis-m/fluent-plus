import { FileDefinition, FileDefinitionFactory } from "./file-definiton-factory";
import { indexHtml } from "./index_html";
import { packageJson } from "./package_json";
import { tsconfigJson } from "./tsconfig_json";
import { tsconfigNodeJson } from "./tsconfig_node_json";
import { viteConfigTs } from "./vite_config_ts";
import { srcAppTsx } from "./src-app_tsx";
import { srcExampleTsx } from "./src-example_tsx";
import { srcIndexTs } from "./src-index_tsx";
import { stackblitzrc } from "./stackblitzrc";

export const fileFactories: FileDefinitionFactory[] = [
    // Root level files (alphabetical)
    indexHtml,
    packageJson,
    tsconfigJson,
    tsconfigNodeJson,
    viteConfigTs,

    // stackblitz files
    stackblitzrc,
    
    // src folder
    srcAppTsx,
    srcExampleTsx,
    srcIndexTs,
];
