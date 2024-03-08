import { Identifier } from "typescript";

export default interface GetAccountOccupationClassResponse {
    id: Identifier;
    accountId: Identifier;
    occupationClassId: Identifier;
    occupationClassName: string;

}