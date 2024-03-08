import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddDegreeTypeRequest from "../models/requests/degreeType/addDegreeTypeRequest";
import DeleteDegreeTypeRequest from "../models/requests/degreeType/deleteDegreeTypeRequest";
import UpdateDegreeTypeRequest from "../models/requests/degreeType/updateDegreeTypeRequest";
import { AddedDegreeTypeResponse } from "../models/responses/degreeType/addedDegreeTypeResponse";
import { GetDegreeTypeResponse } from "../models/responses/degreeType/getDegreeTypeResponse";
import { GetListDegreeTypeResponse } from "../models/responses/degreeType/getListDegreeTypeResponse";
import { UpdatedDegreeTypeResponse } from "../models/responses/degreeType/updatedDegreeTypeResponse";

class DegreeTypeService extends BaseService<
    Paginate<GetListDegreeTypeResponse>,
    GetDegreeTypeResponse,
    AddDegreeTypeRequest,
    AddedDegreeTypeResponse,
    UpdateDegreeTypeRequest,
    UpdatedDegreeTypeResponse,
    DeleteDegreeTypeRequest
> {
    constructor() {
        super()
        this.apiUrl = "DegreeTypes"
    }
}

export default new DegreeTypeService();
