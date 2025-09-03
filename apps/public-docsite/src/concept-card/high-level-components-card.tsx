import React from "react";
import { ConceptCard } from "./concept-card";
import { HighLevelComponentsArtwork } from "./high-level-components-artwork";

/**
 * High-Level Components concept card that showcases opinionated high-level assemblies
 * of framework components
 */
export const HighLevelComponentsCard: React.FC = () => {
    const description = "Opinionated high-level assemblies of framework components.\nPre-built solutions that combine multiple components for common business scenarios and rapid development.";
    
    return (
        <ConceptCard
            artwork={<HighLevelComponentsArtwork width={120} height={120} />}
            header="High-Level Components"
            description={description}
        />
    );
};

export default HighLevelComponentsCard;