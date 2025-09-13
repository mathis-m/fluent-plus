import { useEventCallback } from "@fluentui/react-utilities";
import { FileValidator } from "../components/file-upload";
import { useAcceptedTypes } from "./use-accepted-types";

/**
 * Hook that returns a validator to validate file types against accepted MIME types and extensions.
 * @param acceptedFileTypes A record of accepted file types, where the key is the MIME type and the value is an array of file extensions
 * @returns A function that validates a file against the accepted file types
 */
export const useFileTypeValidator = (acceptedFileTypes: Record<string, readonly string[]>): FileValidator => {
    const acceptedTypes = useAcceptedTypes(acceptedFileTypes);

    return useEventCallback((file: File) => {
        if (acceptedTypes.length === 0) {
            return null;
        }

        const { name = "", type = "" } = file;
        const baseMimeType = type.replace(/\/.*$/, "");

        for (const acceptedType of acceptedTypes) {
            // check if type is extension and if the file name ends with the extension
            if (acceptedType.charAt(0) === "." && name.toLowerCase().endsWith(acceptedType)) {
                return null;
            }

            // check for wildcard mime type match
            if (acceptedType.endsWith("/*") && acceptedType.replace(/\/.*$/, "") === baseMimeType) {
                return null;
            }

            // check for exact mime type match
            if (type.toLowerCase() === acceptedType) {
                return null;
            }
        }

        return "invalid-type";
    });
};
