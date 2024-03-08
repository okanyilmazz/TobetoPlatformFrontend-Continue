import { Identifier } from "typescript";

export default interface UpdatedCertificateResponse {
    id: Identifier;
    accountId: Identifier;
    name: string;
    description: string;
    folderPath: string;
    file: File;
}
