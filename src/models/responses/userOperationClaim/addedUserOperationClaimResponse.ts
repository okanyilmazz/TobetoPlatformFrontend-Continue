import { Identifier } from "typescript";

export default interface AddedUserOperationClaimResponse {
    id: Identifier;
    userId: Identifier;
    operationClaimId: Identifier;
}