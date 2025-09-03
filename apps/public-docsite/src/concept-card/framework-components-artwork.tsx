import React from "react";
import { useConceptCard } from "./concept-card-context";
import { makeStyles } from "@fluentui/react-components";
import { motion } from "motion/react";

const useStyles = makeStyles({
    root: {
        maxWidth: "50%",
    },
    piece1: {
        fill: "#D60136",
    },
    piece2: {
        fill: "#EB4E02",
    },
    piece3: {
        fill: "#52CE01",
    },
    piece4: {
        fill: "#019D66",
    },
});

export interface FrameworkComponentsArtworkProps {
    width?: number;
    height?: number;
}

/**
 * Framework Components artwork representing interconnected component systems
 */
export const FrameworkComponentsArtwork: React.FC<FrameworkComponentsArtworkProps> = ({
    width = 120,
    height = 120,
}) => {
    const { isHovered } = useConceptCard();
    const styles = useStyles();

    return (
        <svg className={styles.root} width={width} height={height} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top-left puzzle piece */}
            <motion.path
                className={styles.piece1}
                d="M24,20 A4,4 0 0,0 20,24 L20,55 L35,55 L35,50 C35,45 40,40 45,40 L50,40 C55,40 60,35 60,30 C60,25 55,20 50,20 L24,20 Z"
                animate={{
                    x: isHovered ? 8 : -8,
                    y: isHovered ? 8 : -8,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            />
            
            {/* Top-right puzzle piece */}
            <motion.path
                className={styles.piece2}
                d="M70,20 C65,20 60,25 60,30 C60,35 65,40 70,40 L75,40 C80,40 85,45 85,50 L85,55 L100,55 L100,24 A4,4 0 0,0 96,20 L70,20 Z"
                animate={{
                    x: isHovered ? -8 : 8,
                    y: isHovered ? 8 : -8,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            />
            
            {/* Bottom-left puzzle piece */}
            <motion.path
                className={styles.piece3}
                d="M20,65 L35,65 L35,70 C35,75 40,80 45,80 L50,80 C55,80 60,85 60,90 C60,95 55,100 50,100 L24,100 A4,4 0 0,1 20,96 L20,65 Z"
                animate={{
                    x: isHovered ? 8 : -8,
                    y: isHovered ? -8 : 8,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            />
            
            {/* Bottom-right puzzle piece */}
            <motion.path
                className={styles.piece4}
                d="M70,100 C65,100 60,95 60,90 C60,85 65,80 70,80 L75,80 C80,80 85,75 85,70 L85,65 L100,65 L100,96 A4,4 0 0,1 96,100 L70,100 Z"
                animate={{
                    x: isHovered ? -8 : 8,
                    y: isHovered ? -8 : 8,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            />
        </svg>
    );
};