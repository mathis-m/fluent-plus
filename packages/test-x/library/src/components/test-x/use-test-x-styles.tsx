import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { TestXSlots, TestXState } from "./test-x.types";

export const testXClassNames: SlotClassNames<TestXSlots> = {
    root: "fplus-TestX",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
    root: {
        // TODO: Add styles for the root element
    },
});

/**
 * Apply styling to the TestX slots based on the state
 */
export const useTestXStyles = (state: TestXState): TestXState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(testXClassNames.root, styles.root, state.root.className);

    return state;
};
