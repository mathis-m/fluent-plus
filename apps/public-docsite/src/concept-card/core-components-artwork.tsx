import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { motion } from "motion/react";
import React from "react";
import { useConceptCard } from "./concept-card-context";

interface CoreComponentsArtworkProps {
    className?: string;
    width?: number | string;
    height?: number | string;
}

const useStyles = makeStyles({
    root: {
        // Base SVG styles can go here if needed
        maxWidth: "50%"
    },
    whiteFill: {
        fill: "#FFFFFF",
    },
    redFill: {
        fill: "#CF1E49",
    },
    piece1Fill: {
        fill: "#D60136",
    },
    piece2Fill: {
        fill: "#EB4E02",
    },
    piece3Fill: {
        fill: "#52CE01",
    },
    piece4Fill: {
        fill: "#019D66",
    },
});

export const CoreComponentsArtwork: React.FC<CoreComponentsArtworkProps> = ({
    className,
    width = 500,
    height = 500,
}) => {
    const styles = useStyles();
    const { isHovered } = useConceptCard();

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 500 500"
            width={width}
            height={height}
            className={mergeClasses(styles.root, className)}
            xmlSpace="preserve">
            <g>
                {/* Top path - first to reveal (clockwise starting from top) */}
                <motion.path
                    className={styles.piece1Fill}
                    d="M244.3,179.5C201.5-51-59.8,219,202.2,247.6C202.2,247.6,244.3,179.7,244.3,179.5z"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: isHovered ? 0.6 : 0.1, // Longer, smoother duration
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: isHovered ? 0.2 : 0, // Start earlier, before circle completes
                    }}
                />
                {/* Right path - second to reveal */}
                <motion.path
                    className={styles.piece2Fill}
                    d="M297.8,247.6c262-28.6,0.7-298.6-42.1-68.1C255.7,179.5,297.9,247.3,297.8,247.6z"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: isHovered ? 0.6 : 0.1, // Same duration for consistency
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: isHovered ? 0.3 : 0, // 0.1s stagger from first path
                    }}
                />
                {/* Bottom path - third to reveal */}
                <motion.path
                    className={styles.piece3Fill}
                    d="M297.8,252.4l-42.1,68.1C298.5,551,559.8,281,297.8,252.4z"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: isHovered ? 0.6 : 0.1, // Same duration for consistency
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: isHovered ? 0.4 : 0, // 0.2s stagger from first path
                    }}
                />
                {/* Left path - fourth to reveal */}
                <motion.path
                    className={styles.piece4Fill}
                    d="M202.2,252.4c-262,28.6-0.7,298.6,42.1,68.1C244.3,320.5,202.4,252.6,202.2,252.4z"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: isHovered ? 0.6 : 0.1, // Same duration for consistency
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: isHovered ? 0.5 : 0, // 0.3s stagger from first path
                    }}
                />
                <motion.circle
                    className={mergeClasses(styles.whiteFill)}
                    cx="250"
                    cy="250"
                    animate={{
                        r: isHovered ? 35.2 : 162.5,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                />
            </g>
        </svg>
    );
};

export default CoreComponentsArtwork;
