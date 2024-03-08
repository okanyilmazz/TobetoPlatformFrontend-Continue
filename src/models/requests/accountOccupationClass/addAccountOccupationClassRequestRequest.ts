import { Identifier } from "typescript";

export default interface AddAccountOccupationClassRequest {
    accountId: Identifier;
    occupationClassId: Identifier;
}