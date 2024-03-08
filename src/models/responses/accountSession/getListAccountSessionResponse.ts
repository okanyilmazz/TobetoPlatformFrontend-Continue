import { Identifier } from "typescript";

export default interface GetListAccountSessionResponse {
    id: Identifier;
    accountId: Identifier;
    sessionId: Identifier;
    status: boolean;
}