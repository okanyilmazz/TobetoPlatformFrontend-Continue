import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import AddLanguageLevelRequest from "../models/requests/languageLevel/addLanguageLevelRequest";
import AddedLanguageLevelResponse from "../models/responses/languageLevel/addedLanguageLevelResponse";
import UpdateLanguageLevelRequest from "../models/requests/languageLevel/updateLanguageLevelRequest";
import UpdatedLanguageLevelResponse from "../models/responses/languageLevel/updatedLanguageLevelResponse";
import GetListLanguageLevelResponse from "../models/responses/languageLevel/getListLanguageLevelResponse";
import getLanguagelevelResponse from "../models/responses/languageLevel/getLanguageLevelResponse";
import DeleteLanguageLevelRequest from "../models/requests/languageLevel/deleteLanguageLevelRequest";

class LanguageLevelService extends BaseService<
    Paginate<GetListLanguageLevelResponse>,
    getLanguagelevelResponse,
    AddLanguageLevelRequest,
    AddedLanguageLevelResponse,
    UpdateLanguageLevelRequest,
    UpdatedLanguageLevelResponse,
    DeleteLanguageLevelRequest

> {
    constructor() {
        super();
        this.apiUrl = "LanguageLevels";
    }

    /* getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListLanguageLevelResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLanguageLevelResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    } */
}

export default new LanguageLevelService(); 
