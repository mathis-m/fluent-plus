import { render } from "@testing-library/react";

import FluentPlusReactComponents from "./react-components";

describe("FluentPlusReactComponents", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<FluentPlusReactComponents />);
        expect(baseElement).toBeTruthy();
    });
});
