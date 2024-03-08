import { Identifier } from "typescript";

export default interface UpdateUserOperationClaimRequest {
    id: Identifier;
    userId: Identifier;
    operationClaimId: Identifier;
}