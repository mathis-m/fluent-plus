import { useMemo } from "react";

export const useAcceptedTypes = (acceptedFileTypes?: Record<string, readonly string[]>): string[] => {
    return useMemo(() => {
        if (!acceptedFileTypes) {
            return [];
        }

        const types = new Set<string>();

        for (const [mimeType, extensions] of Object.entries(acceptedFileTypes)) {
            if (/^\w+\/([-+.\w]+|\*)$/.test(mimeType)) {
                // Valid mime type or mime type with wildcard
                types.add(mimeType.toLowerCase());
            }

            for (const ext of extensions) {
                if (!/^\.\w+$/.test(ext)) continue;
                types.add(ext.toLowerCase());
            }
        }

        return Array.from(types.values());
    }, [acceptedFileTypes]);
};
