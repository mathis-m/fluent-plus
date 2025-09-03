import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { CoreComponentsCard } from "./core-components-card";
import { FrameworkComponentsCard } from "./framework-components-card";
import { HighLevelComponentsCard } from "./high-level-components-card";

const useStyles = makeStyles({
    container: {
        display: "grid",
        width: "100%",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: tokens.spacingHorizontalL,
        flexWrap: "wrap",
    },
});

/**
 * Concepts component that displays a collection of concept cards
 * in a horizontally centered flex layout
 */
export const Concepts: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <CoreComponentsCard />
            <FrameworkComponentsCard />
            <HighLevelComponentsCard />
        </div>
    );
};

export default Concepts;