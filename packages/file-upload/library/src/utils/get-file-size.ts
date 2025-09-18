export const getFileSize = (fileSizeInBytes: number): string => {
    if (fileSizeInBytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));
    const size = fileSizeInBytes / Math.pow(1024, i);
    return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};
