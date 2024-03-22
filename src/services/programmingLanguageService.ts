import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListProgrammingLanguageResponse from "../models/responses/programmingLanguage/getListProgrammingLanguageResponse";
import GetProgrammingLanguageByIdResponse from "../models/responses/programmingLanguage/getProgrammingLanguageByIdResponse";
import AddProgrammingLanguageRequest from "../models/requests/programmingLanguage/addProgrammingLanguageRequest";
import UpdateProgrammingLanguageRequest from "../models/requests/programmingLanguage/updateProgrammingLanguageRequest";
import AddedProgrammingLanguageResponse from "../models/responses/programmingLanguage/addedProgrammingLanguageResponse";
import UpdatedProgrammingLanguageResponse from "../models/responses/programmingLanguage/updatedProgrammingLanguageResponse";

class ProgrammingLanguageService extends BaseService<
    Paginate<GetListProgrammingLanguageResponse>,
    GetProgrammingLanguageByIdResponse,
    AddProgrammingLanguageRequest,
    AddedProgrammingLanguageResponse,
    UpdateProgrammingLanguageRequest,
    UpdatedProgrammingLanguageResponse>{
    constructor() {
        super();
        this.apiUrl = "ProgrammingLanguages";
    }
}

export default new ProgrammingLanguageService();