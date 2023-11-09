export function formatFileSize(fileSizeInBytes: number): string {
    if (fileSizeInBytes === 0) {
        return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));
    const formattedSize = (fileSizeInBytes / Math.pow(1024, i)).toFixed(2);

    return `${formattedSize} ${units[i]}`;
}
