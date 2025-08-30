import { Tree, readProjectConfiguration } from "@nx/devkit";
import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";

import { reactComponentGenerator } from "./react-component";
import { ReactComponentGeneratorSchema } from "./schema";

describe("react-component generator", () => {
    let tree: Tree;
    const options: ReactComponentGeneratorSchema = { name: "test" };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it("should run successfully", async () => {
        await reactComponentGenerator(tree, options);
        const config = readProjectConfiguration(tree, "test");
        expect(config).toBeDefined();
    });
});
