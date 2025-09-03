import React from "react";
import { ConceptCard } from "./concept-card";
import { FrameworkComponentsArtwork } from "./framework-components-artwork";

/**
 * Framework Components concept card that showcases complex feature-rich frameworks
 * and component sets for specific use cases
 */
export const FrameworkComponentsCard: React.FC = () => {
    const description = "Complex and feature-rich frameworks consisting of multiple components for specific use cases.\nLow-level components and utilities that allow for high customizability and serve specific business needs.";
    
    return (
        <ConceptCard
            artwork={<FrameworkComponentsArtwork width={120} height={120} />}
            header="Framework Components"
            description={description}
        />
    );
};

export default FrameworkComponentsCard;