import { createContext, useContext } from "react";

export interface ConceptCardContextValue {
    isHovered: boolean;
}

const ConceptCardContext = createContext<ConceptCardContextValue | undefined>(undefined);

export const ConceptCardProvider = ConceptCardContext.Provider;

/**
 * Hook to access ConceptCard context
 * @returns ConceptCardContextValue containing isHovered state and setter
 * @throws Error if used outside of ConceptCardProvider
 */
export const useConceptCard = (): ConceptCardContextValue => {
    const context = useContext(ConceptCardContext);
    
    if (context === undefined) {
        throw new Error("useConceptCard must be used within a ConceptCardProvider");
    }
    
    return context;
};