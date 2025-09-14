import {
    formatFiles,
    generateFiles,
    installPackagesTask,
    joinPathFragments,
    names,
    readJson,
    Tree,
    writeJson,
} from "@nx/devkit";
import { sortPackageJsonFields } from "@nx/js/src/utils/package-json/sort-fields";
import { libraryGenerator } from "@nx/react";
import { PackageJson } from "nx/src/utils/package-json";
import reactComponentGenerator from "../react-component/react-component";
import { ReactLibGeneratorSchema } from "./schema";

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
        bundler: "rollup",
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

    generateFiles(tree, joinPathFragments(__dirname, "files"), normalizedOptions.libraryRoot, substitutions);

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

    const packageJsonPath = joinPathFragments(normalizedOptions.libraryRoot, "package.json");
    const packageJson = readJson<
        PackageJson & { sideEffects?: boolean; repository?: { type: string; url: string }; license?: string; homepage?: string }
    >(tree, packageJsonPath);

    packageJson.description = substitutions.description;
    packageJson.sideEffects = false;
    packageJson.repository = {
        type: "git",
        url: "https://github.com/mathis-m/fluent-plus",
    };
    packageJson.license = "UNLICENSED";
    packageJson.homepage = "https://mathis-m.github.io/fluent-plus";

    packageJson.peerDependencies = {
        ...(packageJson.peerDependencies ?? {}),
        "@types/react": ">=16.14.0 <20.0.0",
        "@types/react-dom": ">=16.9.0 <20.0.0",
        react: ">=16.14.0 <20.0.0",
        "react-dom": ">=16.14.0 <20.0.0",
        "@fluentui/react-components": ">=9.69.0 <10.0.0",
        "@fluentui/react-context-selector": ">=9.2.6 <10.0.0",
        "@fluentui/react-utilities": ">=9.24.0 <10.0.0",
    };

    // TODO: WTF! Investigate why nx does that resulting file is not ./dist/index.esm.d.ts but instead ./dist/index.d.ts
    packageJson.types = `./dist/index.d.ts`;

    const exports = (packageJson.exports as any) ?? {};
    exports["."].types = packageJson.types;
    delete exports["."]["@fluent-plus/fluent-plus-repo"];

    writeJson(tree, packageJsonPath, packageJson);

    sortPackageJsonFields(tree, normalizedOptions.libraryRoot);

    await formatFiles(tree);

    return () => {
        installPackagesTask(tree);
    };
}

export default reactLibGenerator;
