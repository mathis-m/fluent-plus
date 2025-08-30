/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-utilities";
import type { TestYSlots, TestYState } from "./test-y.types";

/**
 * This function composes the final JSX of TestY
 */
export const renderTestY = (state: TestYState) => {
    assertSlots<TestYSlots>(state);

    return <state.root />;
};
