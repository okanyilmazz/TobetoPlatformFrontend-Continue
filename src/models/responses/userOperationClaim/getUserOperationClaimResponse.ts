import { Identifier } from "typescript";

export default interface GetUserOperationClaimResponse {
    id: Identifier;
    userId: Identifier;
    operationClaimId: Identifier;
}