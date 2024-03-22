import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddEducationProgramDevelopmentRequest from "../models/requests/educationProgramDevelopment/addEducationProgramDevelopmentRequest";
import UpdateEducationProgramDevelopmentRequest from "../models/requests/educationProgramDevelopment/updateEducationProgramDevelopmentRequest";
import AddedEducationProgramDevelopmentResponse from "../models/responses/educationProgramDevelopment/addedEducationProgramDevelopmentResponse";
import GetEducationProgramDevelopmentResponse from "../models/responses/educationProgramDevelopment/getEducationProgramDevelopmentResponse";
import GetListEducationProgramDevelopmentResponse from "../models/responses/educationProgramDevelopment/getListEducationProgramDevelopmentResponse";
import UpdatedEducationProgramDevelopmentResponse from "../models/responses/educationProgramDevelopment/updatedEducationProgramDevelopmentResponse";


class EducationProgramDevelopmentService extends BaseService<
    Paginate<GetListEducationProgramDevelopmentResponse>,
    GetEducationProgramDevelopmentResponse,
    AddEducationProgramDevelopmentRequest,
    AddedEducationProgramDevelopmentResponse,
    UpdateEducationProgramDevelopmentRequest,
    UpdatedEducationProgramDevelopmentResponse> {
    constructor() {
        super()
        this.apiUrl = "EducationProgramDevelopments"
    }
}

export default new EducationProgramDevelopmentService();


