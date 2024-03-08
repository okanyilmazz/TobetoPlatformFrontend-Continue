import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddUniversityRequest from "../models/requests/university/addUniversityRequest";
import DeleteUniversityRequest from "../models/requests/university/deleteUniversityRequest";
import UpdateUniversityRequest from "../models/requests/university/deleteUniversityRequest";
import AddedUniversityResponse from "../models/responses/university/addedUniversityResponse";
import GetListUniversityResponse from "../models/responses/university/getListUniversityResponse";
import GetUniversityResponse from "../models/responses/university/getUniversityResponse";
import UpdatedUniversityResponse from "../models/responses/university/updatetUniversityResponse";

class UniversityService extends BaseService<
    Paginate<GetListUniversityResponse>,
    GetUniversityResponse,
    AddUniversityRequest,
    AddedUniversityResponse,
    UpdateUniversityRequest,
    UpdatedUniversityResponse,
    DeleteUniversityRequest
> {
    constructor() {
        super()
        this.apiUrl = "Universities"
    }
}

export default new UniversityService();