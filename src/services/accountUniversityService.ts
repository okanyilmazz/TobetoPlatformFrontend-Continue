import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAccountUniversityRequest from "../models/requests/accountUniversity/addAccountUniversityRequest";
import UpdateAccountUniversityRequest from "../models/requests/accountUniversity/updateAccountUniversityRequest";
import AddedAccountUniversityResponse from "../models/responses/accountUniversity/addedAccountUniversityResponse";
import GetAccountUniversityResponse from "../models/responses/accountUniversity/getAccountUniversityResponse";
import GetListAccountUniversityResponse from "../models/responses/accountUniversity/getListAccountUniversityResponse";
import UpdatedAccountUniversityResponse from "../models/responses/accountUniversity/updatedAccountUniversityResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class AccountUniversityService extends BaseService<
    Paginate<GetListAccountUniversityResponse>,
    GetAccountUniversityResponse,
    AddAccountUniversityRequest,
    AddedAccountUniversityResponse,
    UpdateAccountUniversityRequest,
    UpdatedAccountUniversityResponse> {
    constructor() {
        super();
        this.apiUrl = "AccountUniversities";
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListAccountUniversityResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountUniversityResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new AccountUniversityService();
