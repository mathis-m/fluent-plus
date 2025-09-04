import { addProjectConfiguration, formatFiles, generateFiles, Tree, names, joinPathFragments, readProjectConfiguration } from "@nx/devkit";
import * as path from "path";
import { ReactComponentGeneratorSchema } from "./schema";

function normalizeOptions(tree: Tree, options: ReactComponentGeneratorSchema) {
    const variations = names(options.name);
    const allNameVariations = {
        ...variations,
        kebabCaseName: variations.fileName,
        pascalCaseName: variations.className,
        camelCaseName: variations.propertyName,
        title: variations.fileName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
    };
    const projectConfig = readProjectConfiguration(tree, options.project);
    const srcRoot = projectConfig.sourceRoot;
    if (!srcRoot) {
        throw new Error(`Project ${options.project} does not have a source root.`);
    }

    const storiesProjectConfig = readProjectConfiguration(tree, `${options.project}-stories`);
    const storiesSrcRoot = storiesProjectConfig.sourceRoot;
    if (!storiesSrcRoot) {
        throw new Error(`Project ${options.project}-stories does not have a source root.`);
    }

    return {
        ...allNameVariations,
        project: options.project,
        componentDir: joinPathFragments(srcRoot, "components", variations.fileName),
        srcRoot: srcRoot,
        storiesSrcRoot: storiesSrcRoot,
        projectName: options.project,
        projectTitle: options.project.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        description: options.description || "TODO: add description",
    };
}

export async function reactComponentGenerator(tree: Tree, options: ReactComponentGeneratorSchema) {
    const normalizedOptions = normalizeOptions(tree, options);

    if (tree.exists(normalizedOptions.componentDir)) {
        throw new Error(`Component ${normalizedOptions.pascalCaseName} already exists in project ${options.project}.`);
    }

    // Generate library files
    generateFiles(tree, path.join(__dirname, "files", "component"), normalizedOptions.componentDir, normalizedOptions);

    // Construct the component reexport content directly in code
    const componentExports = `export type {
    ${normalizedOptions.pascalCaseName}Props,
    ${normalizedOptions.pascalCaseName}State,
    ${normalizedOptions.pascalCaseName}Slots,
} from "./components/${normalizedOptions.kebabCaseName}";
export {
    ${normalizedOptions.pascalCaseName},
    ${normalizedOptions.camelCaseName}ClassNames,
    render${normalizedOptions.pascalCaseName},
    use${normalizedOptions.pascalCaseName}Styles,
    use${normalizedOptions.pascalCaseName},
} from "./components/${normalizedOptions.kebabCaseName}";
`;

    const indexTsPath = joinPathFragments(normalizedOptions.srcRoot, "index.ts");
    const indexTsContent = tree.read(indexTsPath, "utf-8");
    if (!indexTsContent) {
        throw new Error(`Generation failed: missing index.ts file`);
    }

    let updatedContent = indexTsContent.replace("export {};", "");
    updatedContent += componentExports;

    tree.write(indexTsPath, updatedContent);

    // Update stories
    generateFiles(tree, path.join(__dirname, "files", "stories"), joinPathFragments(normalizedOptions.storiesSrcRoot, normalizedOptions.kebabCaseName), normalizedOptions);

    await formatFiles(tree);
}

export default reactComponentGenerator;
