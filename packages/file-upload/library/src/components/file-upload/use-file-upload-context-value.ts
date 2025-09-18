import { FileUploadContextValue } from "../../contexts/file-upload-context";
import { FileUploadState } from "./file-upload.types";

export const useFileUploadContextValue = (state: FileUploadState): FileUploadContextValue => {
    return {
        disabled: state.disabled,
        onSelectFilesButtonClick: state.onSelectFilesButtonClick,
        contentLayout: state.resolvedLayout,
        appearance: state.appearance,
    };
};
