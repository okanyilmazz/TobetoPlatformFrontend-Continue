import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListAccountFavoriteEducationProgramResponse from "../models/responses/accountFavoriteEducationProgram/getListAccountFavoriteEducationProgramResponse";
import AddAccountFavoriteEducationProgramRequest from "../models/requests/accountFavoriteEducationProgram/addAccountFavoriteEducationProgramRequest";
import DeleteAccountFavoriteEducationProgramRequest from "../models/requests/accountFavoriteEducationProgram/deleteAccountFavoriteEducationProgramRequest";
import UpdateAccountFavoriteEducationProgramRequest from "../models/requests/accountFavoriteEducationProgram/updateAccountFavoriteEducationProgramRequest";
import AddedAccountFavoriteEducationProgramResponse from "../models/responses/accountFavoriteEducationProgram/addedAccountFavoriteEducationProgramResponse";
import GetAccountFavoriteEducationProgramResponse from "../models/responses/accountFavoriteEducationProgram/getAccountFavoriteEducationProgramResponse";
import UpdatedAccountFavoriteEducationProgramResponse from "../models/responses/accountFavoriteEducationProgram/updatedAccountFavoriteEducationProgramResponse";


class AccountFavoriteEducationProgramService extends BaseService<
    Paginate<GetListAccountFavoriteEducationProgramResponse>,
    GetAccountFavoriteEducationProgramResponse,
    AddAccountFavoriteEducationProgramRequest,
    AddedAccountFavoriteEducationProgramResponse,
    UpdateAccountFavoriteEducationProgramRequest,
    UpdatedAccountFavoriteEducationProgramResponse,
    DeleteAccountFavoriteEducationProgramRequest
> {
    constructor() {
        super();
        this.apiUrl = "AccountFavoriteEducationPrograms";
    }

    getByAccountId(accountId: string): Promise<AxiosResponse<Paginate<GetListAccountFavoriteEducationProgramResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountFavoriteEducationProgramResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByEducationProgramId(educationProgramId: string): Promise<AxiosResponse<Paginate<GetListAccountFavoriteEducationProgramResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountFavoriteEducationProgramResponse>>(this.apiUrl + "/GetByEducationProgramId?educationProgramId=" + educationProgramId);
    }

    getByAccountIdAndEducationProgramId(accountId: string, educationProgramId: string): Promise<AxiosResponse<GetAccountFavoriteEducationProgramResponse, any>> {
        return axiosInstance.get<GetListAccountFavoriteEducationProgramResponse>(this.apiUrl + "/GetByAccountIdAndEducationProgramId?accountId=" + accountId + "&educationProgramId=" + educationProgramId);
    }

    deleteByAccountIdAndEducationProgramId(request: DeleteAccountFavoriteEducationProgramRequest): any {
        return axiosInstance.post(this.apiUrl + "/DeleteByAccountIdAndEducationProgramId", request);
    }
}

export default new AccountFavoriteEducationProgramService();
