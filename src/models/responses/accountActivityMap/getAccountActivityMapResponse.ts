import { Identifier } from "typescript";

export default interface GetAccountActivityMapResponse {
    id: Identifier;
    accountName: string;
    date: Date;
}
