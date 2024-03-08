import { Identifier } from "typescript";

export default interface UpdatedUserOperationClaimResponse {
    id: Identifier;
    userId: Identifier;
    operationClaimId: Identifier;
}