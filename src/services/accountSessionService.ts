import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountSessionResponse from "../models/responses/accountSession/getListAccountSessionResponse";
import GetAccountSessionResponse from "../models/responses/accountSession/getAccountSessionResponse";
import AddAccountSessionRequest from "../models/requests/accountSession/addAccountSessionRequest";
import AddedAccountSessionResponse from "../models/responses/accountSession/addedAccountSessionResponse";
import UpdateAccountSessionRequest from "../models/requests/accountSession/updateAccountSessionRequest";
import UpdatedAccountSessionResponse from "../models/responses/accountSession/updatedAccountSessionResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteAccountSessionRequest from "../models/requests/accountSession/deleteAccountSessionRequest";

class AccountSessionService extends BaseService<
    Paginate<GetListAccountSessionResponse>,
    GetAccountSessionResponse,
    AddAccountSessionRequest,
    AddedAccountSessionResponse,
    UpdateAccountSessionRequest,
    UpdatedAccountSessionResponse,
    DeleteAccountSessionRequest
> {
    constructor() {
        super();
        this.apiUrl = "AccountSessions";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListAccountSessionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountSessionResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByAccountAndSessionId(accountId: number, sessionId: number): Promise<AxiosResponse<Paginate<GetListAccountSessionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountSessionResponse>>(this.apiUrl + "/GetByAccountAndSessionId?accountId=" + accountId + "&sessionId=" + sessionId);
    }
}

export default new AccountSessionService();
