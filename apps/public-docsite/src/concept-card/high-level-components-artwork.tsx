import React from "react";
import { useConceptCard } from "./concept-card-context";
import { makeStyles } from "@fluentui/react-components";
import { motion } from "motion/react";

const useStyles = makeStyles({
    root: {
        maxWidth: "50%",
    },
    box1: {
        fill: "#D60136",
    },
    box2: {
        fill: "#EB4E02",
    },
    box3: {
        fill: "#52CE01",
    },
    box4: {
        fill: "#019D66",
    },
});

export interface HighLevelComponentsArtworkProps {
    width?: number;
    height?: number;
}

/**
 * High-Level Components artwork representing layered, opinionated assemblies
 */
export const HighLevelComponentsArtwork: React.FC<HighLevelComponentsArtworkProps> = ({
    width = 120,
    height = 120,
}) => {
    const { isHovered } = useConceptCard();
    const styles = useStyles();

    const boxSize = 35;
    const gap = 5;
    const totalSize = boxSize * 2 + gap;
    const startX = (120 - totalSize) / 2;
    const startY = (120 - totalSize) / 2;

    return (
        <svg className={styles.root} width={width} height={height} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.g
                style={{ transformOrigin: "60px 60px" }}
                animate={{
                    rotate: isHovered ? 45 : 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            >
                {/* Top-left box */}
                <rect
                    className={styles.box1}
                    x={startX}
                    y={startY}
                    width={boxSize}
                    height={boxSize}
                    rx={4}
                />
                
                {/* Top-right box */}
                <rect
                    className={styles.box2}
                    x={startX + boxSize + gap}
                    y={startY}
                    width={boxSize}
                    height={boxSize}
                    rx={4}
                />
                
                {/* Bottom-left box */}
                <rect
                    className={styles.box3}
                    x={startX}
                    y={startY + boxSize + gap}
                    width={boxSize}
                    height={boxSize}
                    rx={4}
                />
                
                {/* Bottom-right box */}
                <rect
                    className={styles.box4}
                    x={startX + boxSize + gap}
                    y={startY + boxSize + gap}
                    width={boxSize}
                    height={boxSize}
                    rx={4}
                />
            </motion.g>
        </svg>
    );
};