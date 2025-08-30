import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, names, Tree } from "@nx/devkit";
import { libraryGenerator } from "@nx/react";
import { ReactLibGeneratorSchema } from "./schema";
import reactComponentGenerator from "../react-component/react-component";

function normalizeOptions(options: ReactLibGeneratorSchema) {
    const variations = names(options.name);
    const allNameVariations = {
        ...variations,
        title: variations.fileName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
    };

    const root = joinPathFragments("packages", allNameVariations.fileName);
    const libraryRoot = joinPathFragments(root, "library");
    const storyBookRoot = joinPathFragments(root, "stories");

    return {
        projectName: allNameVariations.fileName,
        storyBookProjectName: `${allNameVariations.fileName}-stories`,
        ...allNameVariations,
        root,
        libraryRoot,
        storyBookRoot,
    };
}

export async function reactLibGenerator(tree: Tree, options: ReactLibGeneratorSchema) {
    const normalizedOptions = normalizeOptions(options);

    await libraryGenerator(tree, {
        name: normalizedOptions.projectName,
        importPath: `@fluent-plus/${normalizedOptions.projectName}`,
        directory: normalizedOptions.libraryRoot,
        bundler: "vite",
        unitTestRunner: "jest",
        linter: "eslint",
        component: false,
        minimal: true,
        style: "none",
        publishable: true,
        skipFormat: true,
        skipPackageJson: true,
    });

    await libraryGenerator(tree, {
        name: normalizedOptions.storyBookProjectName,
        importPath: `@fluent-plus/${normalizedOptions.storyBookProjectName}`,
        directory: normalizedOptions.storyBookRoot,
        bundler: "none",
        unitTestRunner: "none",
        linter: "eslint",
        component: false,
        minimal: true,
        style: "css",
        publishable: false,
        skipFormat: true,
        skipPackageJson: true,
        tags: "type:stories",
    });

    const generatedIndexTsPath = joinPathFragments(normalizedOptions.libraryRoot, "src", "index.ts");
    tree.delete(generatedIndexTsPath);

    const substitutions = {
        projectName: normalizedOptions.projectName,
        pascalCaseName: normalizedOptions.className,
        title: normalizedOptions.title,
        description: "TODO: Add description",
        template: "",
    };

    generateFiles(
        tree,
        joinPathFragments(__dirname, "files"),
        normalizedOptions.libraryRoot,
        substitutions
    );

    generateFiles(
        tree,
        joinPathFragments(__dirname, "storybook-files"),
        normalizedOptions.storyBookRoot,
        substitutions
    );

    await reactComponentGenerator(tree, {
        name: normalizedOptions.projectName,
        project: normalizedOptions.projectName,
    });

    await formatFiles(tree);

    return () => {
        installPackagesTask(tree);
    };
}

export default reactLibGenerator;
