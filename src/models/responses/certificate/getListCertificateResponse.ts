import { Identifier } from "typescript";

export default interface GetListCertificateResponse {
    id: Identifier;
    accountId: Identifier;
    name: string;
    description: string;
    folderPath: string;
    file: File;
    createdDate: Date;
}
