import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountSkillResponse from "../models/responses/accountSkill/getListAccountSkillResponse";
import GetAccountSkillResponse from "../models/responses/accountSkill/getAccountSkillResponse";
import AddAccountSkillRequest from "../models/requests/accountSkill/addAccountSkillRequest";
import AddedAccountSkillResponse from "../models/responses/accountSkill/addedAccountSkillResponse";
import UpdateAccountSkillRequest from "../models/requests/accountSkill/updateAccountSkillRequest";
import UpdatedAccountSkillResponse from "../models/responses/accountSkill/updatedAccountSkillResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class AccountSkillService extends BaseService<
    Paginate<GetListAccountSkillResponse>,
    GetAccountSkillResponse,
    AddAccountSkillRequest,
    AddedAccountSkillResponse,
    UpdateAccountSkillRequest,
    UpdatedAccountSkillResponse> {
    constructor() {
        super();
        this.apiUrl = "AccountSkills";
    }

    addRange(requests: AddAccountSkillRequest[]): Promise<AxiosResponse<AddedAccountSkillResponse[], any>> {
        return axiosInstance.post<AddedAccountSkillResponse[]>(this.apiUrl + "/AddRange", requests);
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListAccountSkillResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountSkillResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new AccountSkillService();
