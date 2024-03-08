import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAccountActivityMapRequest from "../models/requests/accountActivityMap/addAccountActivityMapRequest";
import DeleteAccountActivityMapRequest from "../models/requests/accountActivityMap/deleteAccountActivityMapRequest";
import UpdateAccountActivityMapRequest from "../models/requests/accountActivityMap/updateAccountActivityMapRequest";
import AddedAccountActivityMapResponse from "../models/responses/accountActivityMap/addedAccountActivityMapResponse";
import GetAccountActivityMapResponse from "../models/responses/accountActivityMap/getAccountActivityMapResponse";
import GetListAccountActivityMapResponse from "../models/responses/accountActivityMap/getListAccountActivityMapResponse";
import UpdatedAccountActivityMapResponse from "../models/responses/accountActivityMap/updatedAccountActivityMapResponse";


class AccountActivityMapService extends BaseService<
    Paginate<GetListAccountActivityMapResponse>,
    GetAccountActivityMapResponse,
    AddAccountActivityMapRequest,
    AddedAccountActivityMapResponse,
    UpdateAccountActivityMapRequest,
    UpdatedAccountActivityMapResponse,
    DeleteAccountActivityMapRequest
> {
    constructor() {
        super();
        this.apiUrl = "AccountActivityMaps";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListAccountActivityMapResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountActivityMapResponse>>(this.apiUrl + "/GetByAccountId?id=" + accountId);
    }
}

export default new AccountActivityMapService();
