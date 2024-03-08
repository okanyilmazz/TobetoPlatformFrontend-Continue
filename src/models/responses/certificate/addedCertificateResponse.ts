import { Identifier } from "typescript";

export default interface AddedCertificateResponse {
    id: Identifier;
    accountId: Identifier;
    name: string;
    description: string;
    folderPath: string;
    file: File;
}
