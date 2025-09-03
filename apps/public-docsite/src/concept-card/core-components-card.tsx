import React from "react";
import { ConceptCard } from "./concept-card";
import { CoreComponentsArtwork } from "./core-components-artwork";

/**
 * Core Components concept card that showcases fundamental building blocks
 * for Fluent UI v9 ecosystem
 */
export const CoreComponentsCard: React.FC = () => {
    const description = "Fundamental components that could be part of Fluent UI v9 but aren't yet available.\nHighly customizable building blocks designed with Fluent UI v9's API patterns and design principles.";
    
    return (
        <ConceptCard
            artwork={<CoreComponentsArtwork width={120} height={120} />}
            header="Core Components"
            description={description}
        />
    );
};

export default CoreComponentsCard;