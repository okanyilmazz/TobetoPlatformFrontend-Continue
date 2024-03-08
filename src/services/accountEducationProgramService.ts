import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import UpdateAccountEducationProgramRequest from "../models/requests/accountEducationProgram/updateEducationProgramRequest";
import AddAccountEducationProgramRequest from "../models/requests/accountEducationProgram/addEducationProgramRequest";
import DeleteAccountEducationProgramRequest from "../models/requests/accountEducationProgram/deleteEducationProgramRequest";
import AddedAccountEducationProgramResponse from "../models/responses/accountEducationProgram/addedAccountEducationProgramResponse";
import GetAccountEducationProgramResponse from "../models/responses/accountEducationProgram/getAccountEducationProgramResponse";
import UpdatedAccountEducationProgramResponse from "../models/responses/accountEducationProgram/updatedAccountEducationProgramResponse";
import GetListAccountEducationProgramResponse from "../models/responses/accountEducationProgram/getAccountListEducationProgramResponse";
import { Identifier } from "typescript";


class AccountEducationProgramService extends BaseService<
    Paginate<GetListAccountEducationProgramResponse>,
    GetAccountEducationProgramResponse,
    AddAccountEducationProgramRequest,
    AddedAccountEducationProgramResponse,
    UpdateAccountEducationProgramRequest,
    UpdatedAccountEducationProgramResponse,
    DeleteAccountEducationProgramRequest
> {
    constructor() {
        super();
        this.apiUrl = "AccountEducationPrograms";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListAccountEducationProgramResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountEducationProgramResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByAccountIdAndEducationProgramId(accountId: number, educationProgramId: string): Promise<AxiosResponse<GetListAccountEducationProgramResponse, any>> {
        return axiosInstance.get<GetListAccountEducationProgramResponse>(this.apiUrl + "/GetByAccountIdAndEducationProgramId?accountId=" + accountId + "&educationProgramId=" + educationProgramId);
    }
}

export default new AccountEducationProgramService();
