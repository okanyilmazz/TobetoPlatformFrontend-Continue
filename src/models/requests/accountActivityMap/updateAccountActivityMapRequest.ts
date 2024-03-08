import { Identifier } from "typescript";

export default interface UpdateAccountActivityMapRequest {
    id: Identifier;
    accountId: Identifier;
    activityMapId: Identifier;

}