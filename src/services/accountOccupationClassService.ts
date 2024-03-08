import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import GetListAccountOccupationClassResponse from "../models/responses/accountOccuopationClass/getListAccountOccupationClassResponse";
import GetAccountOccupationClassResponse from "../models/responses/accountOccuopationClass/getAccountOccupationClassResponse";
import AddAccountOccupationClassRequest from "../models/requests/accountOccupationClass/addAccountOccupationClassRequestRequest";
import AddedAccountOccupationClassResponse from "../models/responses/accountOccuopationClass/addedAccountOccupationClassResponse";
import UpdateAccountOccupationClassRequest from "../models/requests/accountOccupationClass/updateAccountOccupationClassRequest";
import UpdatedAccountOccupationClassResponse from "../models/responses/accountOccuopationClass/updatedAccountOccupationClassResponse";
import DeleteAccountOccupationClassRequest from "../models/requests/accountOccupationClass/deleteAccountOccupationClassRequest";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { Identifier } from "typescript";


class AccountOccupationClassService extends BaseService<
    Paginate<GetListAccountOccupationClassResponse>,
    GetAccountOccupationClassResponse,
    AddAccountOccupationClassRequest,
    AddedAccountOccupationClassResponse,
    UpdateAccountOccupationClassRequest,
    UpdatedAccountOccupationClassResponse,
    DeleteAccountOccupationClassRequest>{
    constructor() {
        super()
        this.apiUrl = "AccountOccupationClasses"
    }


    getByAccountIdAndOccupationClassId(accountId: string, occupationClassId: string): Promise<AxiosResponse<Paginate<GetListAccountOccupationClassResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountOccupationClassResponse>>(this.apiUrl + "/GetByAccountIdAndOccupationClassId?accountId=" + accountId + "&occupationClassId=" + occupationClassId);
    }
}

export default new AccountOccupationClassService();