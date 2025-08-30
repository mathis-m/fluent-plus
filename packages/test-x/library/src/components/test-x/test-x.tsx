import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { renderTestX } from "./render-test-x";
import type { TestXProps } from "./test-x.types";
import { useTestX } from "./use-test-x";
import { useTestXStyles } from "./use-test-x-styles";

/**
 * TestX component
 * TODO: add description
 */
export const TestX: ForwardRefComponent<TestXProps> = React.forwardRef((props, ref) => {
    const state = useTestX(props, ref);
    useTestXStyles(state);

    return renderTestX(state);
});

TestX.displayName = "TestX";
