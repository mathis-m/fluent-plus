import { tokens } from "@fluentui/react-components";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${tokens.spacingHorizontalXL};
`;
export const OverviewList = (props: { children?: ReactNode }) => {
    return <Container className="overview-list">{props.children}</Container>;
};
