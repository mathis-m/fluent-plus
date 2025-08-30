import { FluentProvider, PortalMountNodeProvider, webLightTheme } from "@fluentui/react-components";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs/blocks";
import React, { ReactNode, useCallback, useState } from "react";

export const FluentDocsContainer: React.FC<{
    children?: ReactNode;
    context: DocsContainerProps["context"];
}> = ({ children, context }) => {
    const [mountNode, setMountNode] = useState<HTMLElement | undefined>(undefined);
    const setMountNodeRef = useCallback((node: HTMLElement | null) => {
        setMountNode(node ?? undefined);
    }, []);

    return (
        <FluentProvider
            ref={setMountNodeRef}
            className="sb-unstyled"
            style={{ backgroundColor: "transparent" }}
            theme={webLightTheme}>
            {mountNode && (
                <PortalMountNodeProvider value={mountNode}>
                    <DocsContainer context={context}>{children}</DocsContainer>
                </PortalMountNodeProvider>
            )}
        </FluentProvider>
    );
};
