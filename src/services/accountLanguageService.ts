import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountLanguageResponse from "../models/responses/accountLanguage/getListAccountLanguageResponse";
import GetAccountLanguageResponse from "../models/responses/accountLanguage/getAccountLanguageResponse";
import AddAccountLanguageRequest from "../models/requests/accountLanguage/addAccountLanguageRequest";
import AddedAccountLanguageResponse from "../models/responses/accountLanguage/addedAccountLanguageResponse";
import UpdateAccountLanguageRequest from "../models/requests/accountLanguage/updateAccountLanguageRequest";
import UpdatedAccountLanguageResponse from "../models/responses/accountLanguage/updatedAccountLanguageResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteAccountLanguageRequest from "../models/requests/accountLanguage/deleteAccountLanguageRequest";

class AccountLanguageService extends BaseService<
    Paginate<GetListAccountLanguageResponse>,
    GetAccountLanguageResponse,
    AddAccountLanguageRequest,
    AddedAccountLanguageResponse,
    UpdateAccountLanguageRequest,
    UpdatedAccountLanguageResponse,
    DeleteAccountLanguageRequest

> {
    constructor() {
        super();
        this.apiUrl = "AccountLanguages";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetAccountLanguageResponse>, any>> {
        return axiosInstance.get<Paginate<GetAccountLanguageResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }
}

export default new AccountLanguageService();
