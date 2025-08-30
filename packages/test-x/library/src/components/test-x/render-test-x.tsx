/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { TestXSlots, TestXState } from "./test-x.types";

/**
 * This function composes the final JSX of TestX
 */
export const renderTestX = (state: TestXState) => {
    assertSlots<TestXSlots>(state);

    return <state.root />;
};
