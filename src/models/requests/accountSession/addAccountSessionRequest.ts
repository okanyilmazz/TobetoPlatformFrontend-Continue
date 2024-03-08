import { Identifier } from "typescript";

export default interface AddAccountSessionRequest {
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}