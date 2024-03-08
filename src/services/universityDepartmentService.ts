import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddUniversityDepartmentRequest from "../models/requests/universityDepartment/addUniversityDepartmentRequest";
import DeleteUniversityDepartmentRequest from "../models/requests/universityDepartment/deleteUniversityDepartmentRequest";
import UpdateUniversityDepartmentRequest from "../models/requests/universityDepartment/updateUniversityDepartmentRequest";
import AddedUniversityDepartmentResponse from "../models/responses/universityDepartment/addedUniversityDepartmentResponse";
import GetListUniversityDepartmentResponse from "../models/responses/universityDepartment/getListUniversityDepartmentResponse";
import GetUniversityDepartmentResponse from "../models/responses/universityDepartment/getUniversityDepartmentResponse";
import UpdatedUniversityDepartmentResponse from "../models/responses/universityDepartment/updatedUniversityDepartmentResponse";

class UniversityDepartmentService extends BaseService<
    Paginate<GetListUniversityDepartmentResponse>,
    GetUniversityDepartmentResponse,
    AddUniversityDepartmentRequest,
    AddedUniversityDepartmentResponse,
    UpdateUniversityDepartmentRequest,
    UpdatedUniversityDepartmentResponse,
    DeleteUniversityDepartmentRequest
> {
    constructor() {
        super()
        this.apiUrl = "UniversityDepartments"
    }
}

export default new UniversityDepartmentService();