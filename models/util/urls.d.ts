declare const url: (alias: string, project: string) => {
    api: string;
    cms: string;
    liveWeb: string;
    previewWeb: string;
    iisWeb: string;
    iisPreviewWeb: string;
};
export default url;
