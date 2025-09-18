import { FileCard } from "@fluent-plus/file-upload";
const file = new File(["file content"], "example.txt", { type: "text/plain", lastModified: Date.now() });
export const Default = () => {
    return <FileCard file={file} appearance="outline" onClick={() => {}} />;
};
