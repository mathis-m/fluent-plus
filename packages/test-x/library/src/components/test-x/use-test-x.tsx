import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import type { TestXProps, TestXState } from "./test-x.types";

/**
 * This hook creates the state used for rendering TestX component.
 *
 * The returned state can be modified with hooks such as useTestXStyles,
 * before being passed to renderTestX.
 *
 * @param props - props from this instance of TestX
 * @param ref - reference to root HTMLDivElement of TestX
 */
export const useTestX = (props: TestXProps, ref: React.Ref<HTMLDivElement>): TestXState => {
    return {
        components: {
            root: "div",
        },
        root: slot.always(
            getIntrinsicElementProps("div", {
                ref,
                ...props,
            }),
            { elementType: "div" }
        ),
    };
};
