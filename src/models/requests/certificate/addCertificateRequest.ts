export default interface AddCertificateRequest {
    accountId: string;
    name: string;
    description: string;
    folderPath: string;
    file: File | FormData | Blob;
}
