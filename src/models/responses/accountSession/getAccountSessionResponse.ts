import { Identifier } from "typescript";

export default interface GetAccountSessionResponse {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}