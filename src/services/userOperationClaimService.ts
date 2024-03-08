import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddUserOperationClaimRequest from "../models/requests/userOperationClaim/addUserOperationClaimRequest";
import DeleteUserOperationClaimRequest from "../models/requests/userOperationClaim/deleteUserOperationClaimRequest";
import UpdateUserOperationClaimRequest from "../models/requests/userOperationClaim/updateUserOperationClaimRequest";
import AddedUserOperationClaimResponse from "../models/responses/userOperationClaim/addedUserOperationClaimResponse";
import GetListUserOperationClaimResponse from "../models/responses/userOperationClaim/getListUserOperationClaimResponse";
import GetUserOperationClaimResponse from "../models/responses/userOperationClaim/getUserOperationClaimResponse";
import UpdatedUserOperationClaimResponse from "../models/responses/userOperationClaim/updatedUserOperationClaimResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class UserOperationClaimService extends BaseService<
    Paginate<GetListUserOperationClaimResponse>,
    GetUserOperationClaimResponse,
    AddUserOperationClaimRequest,
    AddedUserOperationClaimResponse,
    UpdateUserOperationClaimRequest,
    UpdatedUserOperationClaimResponse,
    DeleteUserOperationClaimRequest
> {
    constructor() {
        super()
        this.apiUrl = "UserOperationClaims"
    }

    getByUserIdAndOperationClaimId(userId: number, operationClaimId: number): Promise<AxiosResponse<GetListUserOperationClaimResponse, any>> {
        return axiosInstance.get<GetListUserOperationClaimResponse>(this.apiUrl + "/GetByUserIdAndOperationClaimId?userId=" + userId + "&operationClaimId=" + operationClaimId);
    }

    getByUserId(userId: string): Promise<AxiosResponse<Paginate<GetListUserOperationClaimResponse>, any>> {
        return axiosInstance.get<Paginate<GetListUserOperationClaimResponse>>(this.apiUrl + "/GetByUserId?userId=" + userId);
    }
}


export default new UserOperationClaimService(); 