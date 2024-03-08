import { Identifier } from "typescript";

export default interface UpdateAccountOccupationClassRequest {
    id: Identifier;
    accountId: Identifier;
    occupationClassId: Identifier;
}