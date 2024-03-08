import { Identifier } from "typescript";

export default interface GetListUserOperationClaimResponse {
    id: Identifier;
    userId: Identifier;
    operationClaimId: Identifier;
    operationClaimName: string;
}