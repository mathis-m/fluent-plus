import { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
import * as React from "react";
import type { TestYProps, TestYState } from "./test-y.types";

/**
 * This hook creates the state used for rendering TestY component.
 *
 * The returned state can be modified with hooks such as useTestYStyles,
 * before being passed to renderTestY.
 *
 * @param props - props from this instance of TestY
 * @param ref - reference to root HTMLDivElement of TestY
 */
export const useTestY = (props: TestYProps, ref: React.Ref<HTMLDivElement>): TestYState => {
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
