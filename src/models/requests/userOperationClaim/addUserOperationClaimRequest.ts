import { Identifier } from "typescript";

export default interface AddUserOperationClaimRequest {
    userId : Identifier;
    operationClaimId : Identifier;
}