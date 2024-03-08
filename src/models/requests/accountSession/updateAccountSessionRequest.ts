import { Identifier } from "typescript";

export default interface UpdateAccountSessionRequest {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}