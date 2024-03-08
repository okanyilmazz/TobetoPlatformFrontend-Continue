import { Identifier } from "typescript";

export default interface UpdatedAccountSessionResponse {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}