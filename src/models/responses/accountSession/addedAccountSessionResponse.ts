import { Identifier } from "typescript";

export default interface AddedAccountSessionResponse {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}