import { ContextSelector, createContext, useContextSelector } from "@fluentui/react-context-selector";
import React from "react";
import { FileUploadProps } from "../components/file-upload";

export type FileUploadContextValue = {
    disabled: boolean;
    onSelectFilesButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    contentLayout: "horizontal" | "vertical";
    appearance: Required<FileUploadProps>["appearance"];
};

export const defaultFileUploadContextValue: FileUploadContextValue = {
    disabled: false,
    onSelectFilesButtonClick: () => {
        /* no-op */
    },
    contentLayout: "horizontal",
    appearance: "outline-dashed",
};

const FileUploadContext = createContext<FileUploadContextValue>(defaultFileUploadContextValue);

export const FileUploadContextProvider = FileUploadContext.Provider;

export const useFileUploadContext = <TValue>(selector: ContextSelector<FileUploadContextValue, TValue>) =>
    useContextSelector(FileUploadContext, selector);
