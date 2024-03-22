import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListAccountSocialMediaResponse from "../models/responses/accountSocialMedia/getListAccountSocialMediaResponse";
import GetAccountSocialMediaResponse from "../models/responses/accountSocialMedia/getAccountSocialMediaResponse";
import AddAccountSocialMediaRequest from "../models/requests/accountSocialMedia/addAccountSocialMediaRequest";
import AddedAccountSocialMediaResponse from "../models/responses/accountSocialMedia/addedAccountSocialMediaResponse";
import UpdateAccountSocialMediaRequest from "../models/requests/accountSocialMedia/updateAccountSocialMediaRequest";
import UpdatedAccountSocialMediaResponse from "../models/responses/accountSocialMedia/updatedAccountSocialMediaResponse";

class AccountSocialMediaService extends BaseService<
    Paginate<GetListAccountSocialMediaResponse>,
    GetAccountSocialMediaResponse,
    AddAccountSocialMediaRequest,
    AddedAccountSocialMediaResponse,
    UpdateAccountSocialMediaRequest,
    UpdatedAccountSocialMediaResponse> {
    constructor() {
        super();
        this.apiUrl = "AccountSocialMedias";
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListAccountSocialMediaResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountSocialMediaResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }

}

export default new AccountSocialMediaService();
