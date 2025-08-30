import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the TestY component
 */
export type TestYSlots = {
    root: Slot<"div">;
};

/**
 * Props for the TestY component
 */
export type TestYProps = ComponentProps<TestYSlots> & {};

/**
 * State for the TestY component
 */
export type TestYState = ComponentState<TestYSlots>;
// & Required<Pick<TestYProps, 'propName'>>;
