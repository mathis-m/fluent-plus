import type { ComponentProps, ComponentState, Slot } from "@fluentui/react-utilities";

/**
 * Slots for the TestX component
 */
export type TestXSlots = {
    root: Slot<"div">;
};

/**
 * Props for the TestX component
 */
export type TestXProps = ComponentProps<TestXSlots> & {};

/**
 * State for the TestX component
 */
export type TestXState = ComponentState<TestXSlots>;
// & Required<Pick<TestXProps, 'propName'>>;
