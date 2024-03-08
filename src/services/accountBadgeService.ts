import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountBadgeResponse from "../models/responses/accountBadge/getListAccountBadgeResponse";
import GetAccountBadgeResponse from "../models/responses/accountBadge/getAccountBadgeResponse";
import AddAccountBadgeRequest from "../models/requests/accountBadge/addAccountBadgeRequest";
import AddedAccountBadgeResponse from "../models/responses/accountBadge/addedAccountBadgeResponse";
import UpdateAccountBadgeRequest from "../models/requests/accountBadge/updateAccountBadgeRequest";
import UpdatedAccountBadgeResponse from "../models/responses/accountBadge/updatedAccountBadgeResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteAccountBadgeRequest from "../models/requests/accountBadge/deleteAccountBadgeRequest";
import { Identifier } from "typescript";

class AccountBadgeService extends BaseService<
  Paginate<GetListAccountBadgeResponse>,
  GetAccountBadgeResponse,
  AddAccountBadgeRequest,
  AddedAccountBadgeResponse,
  UpdateAccountBadgeRequest,
  UpdatedAccountBadgeResponse,
  DeleteAccountBadgeRequest
> {
  constructor() {
    super();
    this.apiUrl = "AccountBadges";
  }

  getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListAccountBadgeResponse>, any>> {
    return axiosInstance.get<Paginate<GetListAccountBadgeResponse>>(this.apiUrl + "/GetByAccountId?id=" + accountId);
  }

  getByAccountAndBadgeId(accountId: Identifier, badgeId: Identifier): Promise<AxiosResponse<GetListAccountBadgeResponse, any>> {
    return axiosInstance.get<GetListAccountBadgeResponse>(this.apiUrl + "/GetByAccountAndBadgeId?accountId=" + accountId + "&badgeId=" + badgeId);
  }
}

export default new AccountBadgeService();
