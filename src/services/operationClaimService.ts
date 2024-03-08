import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddOperationClaimRequest from "../models/requests/operationClaim/addOperationClaimRequest";
import DeleteOperationClaimRequest from "../models/requests/operationClaim/deleteOperationClaimRequest";
import UpdateOperationClaimRequest from "../models/requests/operationClaim/updateOperationClaimRequest";
import AddedOperationClaimResponse from "../models/responses/operationClaim/addedOperationClaimResponse";
import GetListOperationClaimResponse from "../models/responses/operationClaim/getListOperationClaimResponse";
import GetOperationClaimResponse from "../models/responses/operationClaim/getOperationClaimResponse";
import UpdatedOperationClaimResponse from "../models/responses/operationClaim/updatedOperationClaimResponse";

class OperationClaimService extends BaseService<
    Paginate<GetListOperationClaimResponse>,
    GetOperationClaimResponse,
    AddOperationClaimRequest,
    AddedOperationClaimResponse,
    UpdateOperationClaimRequest,
    UpdatedOperationClaimResponse,
    DeleteOperationClaimRequest
> {
    constructor() {
        super()
        this.apiUrl = "OperationClaims"
    }
}

export default new OperationClaimService(); 