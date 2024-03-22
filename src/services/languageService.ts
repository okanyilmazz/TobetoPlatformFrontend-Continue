import { Paginate } from "../models/paginate";
import GetListLanguageResponse from "../models/responses/language/getListLanguageResponse";
import GetLanguageResponse from "../models/responses/language/getLanguageResponse";
import AddLanguageRequest from "../models/requests/language/addLanguageRequest";
import AddedLanguageResponse from "../models/responses/language/addedLanguageResponse";
import UpdateLanguageRequest from "../models/requests/language/updateLanguageRequest";
import UpdatedLanguageResponse from "../models/responses/language/updatedLanguageResponse";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class LanguageService extends BaseService<
    Paginate<GetListLanguageResponse>,
    GetLanguageResponse,
    AddLanguageRequest,
    AddedLanguageResponse,
    UpdateLanguageRequest,
    UpdatedLanguageResponse> {
    constructor() {
        super();
        this.apiUrl = "Languages";
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListLanguageResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLanguageResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new LanguageService(); 