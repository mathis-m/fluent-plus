import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { TestYSlots, TestYState } from "./test-y.types";

export const testYClassNames: SlotClassNames<TestYSlots> = {
    root: "fplus-TestY",
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
 * Apply styling to the TestY slots based on the state
 */
export const useTestYStyles = (state: TestYState): TestYState => {
    "use no memo";

    const styles = useStyles();
    state.root.className = mergeClasses(testYClassNames.root, styles.root, state.root.className);

    return state;
};
