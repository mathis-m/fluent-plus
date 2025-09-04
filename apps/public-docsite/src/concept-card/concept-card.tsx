import {
    Caption1,
    Card,
    CardHeader,
    CardPreview,
    makeStyles,
    Text,
    tokens,
    useAnimationFrame,
    useEventCallback,
} from "@fluentui/react-components";
import React, { useState } from "react";
import { ConceptCardProvider } from "./concept-card-context";

const useStyles = makeStyles({
    card: {
        maxWidth: "min(400px, 100%)",
    },
    cardPreview: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120px",
        backgroundColor: "#252C3F",
    },
    description: {
        color: tokens.colorNeutralForeground3,
    },
});

export interface ConceptCardProps {
    /**
     * Artwork to display in the card preview
     */
    artwork: React.ReactNode;
    /**
     * Header text for the card
     */
    header: string;
    /**
     * Description text for the card
     */
    description: string;
}

/**
 * ConceptCard component for displaying concept information with artwork, header, and description
 */
export const ConceptCard: React.FC<ConceptCardProps> = ({ artwork, header, description }) => {
    const styles = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const animateEndTimeoutRef = React.useRef<number | undefined>(undefined);

    const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

    const handleMouseEnter = useEventCallback(() => {
        window.clearTimeout(animateEndTimeoutRef.current);
        cancelAnimationFrame();
        setIsHovered(true);
    });

    const handleMouseLeave = useEventCallback(() => {
        // Delay the hover end state to create rollback the effect with a slight delay
        animateEndTimeoutRef.current = window.setTimeout(() => {
            requestAnimationFrame(() => {
                setIsHovered(false);
            });
        }, 1500);
    });

    const contextValue = { isHovered };

    return (
        <Card className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ConceptCardProvider value={contextValue}>
                <CardPreview className={styles.cardPreview}>{artwork}</CardPreview>
                <CardHeader
                    header={<Text weight="semibold">{header}</Text>}
                    description={<Caption1 className={styles.description}>{description}</Caption1>}
                />
            </ConceptCardProvider>
        </Card>
    );
};
