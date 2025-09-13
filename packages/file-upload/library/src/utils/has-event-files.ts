export function hasEventFiles(event: DragEvent): boolean {
    if (!event.dataTransfer) {
        return event.target !== null && "files" in event.target;
    }

    return event.dataTransfer.types.some((type) => type === "Files" || type === "application/x-moz-file");
}
