import { Identifier } from "typescript";

export default interface GetListAccountOccupationClassResponse {
    id: Identifier;
    accountId: Identifier;
    occupationClassId: Identifier;
    occupationClassName: string;

}