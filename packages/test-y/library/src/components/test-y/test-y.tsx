import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";
import { renderTestY } from "./render-test-y";
import type { TestYProps } from "./test-y.types";
import { useTestY } from "./use-test-y";
import { useTestYStyles } from "./use-test-y-styles";

/**
 * TestY component
 * TODO: add description
 */
export const TestY: ForwardRefComponent<TestYProps> = React.forwardRef((props, ref) => {
    const state = useTestY(props, ref);
    useTestYStyles(state);

    return renderTestY(state);
});

TestY.displayName = "TestY";
