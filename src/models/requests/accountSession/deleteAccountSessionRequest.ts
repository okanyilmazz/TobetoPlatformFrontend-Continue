import { Identifier } from "typescript";

export default interface DeleteAccountSessionRequest {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}