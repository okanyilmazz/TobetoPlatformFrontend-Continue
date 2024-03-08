import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddEducationProgramLevelRequest from "../models/requests/educationProgramLevel/addEducationProgramLevelRequest";
import DeleteEducationProgramLevelRequest from "../models/requests/educationProgramLevel/deleteEducationProgramLevelRequest";
import UpdateEducationProgramLevelRequest from "../models/requests/educationProgramLevel/updateEducationProgramLevelRequest";
import { AddedEducationProgramLevelResponse } from "../models/responses/educationProgramLevel/addedEducationProgramLevelResponse";
import { GetEducationProgramLevelResponse } from "../models/responses/educationProgramLevel/getEducationProgramLevelResponse";
import { GetListEducationProgramLevelResponse } from "../models/responses/educationProgramLevel/getListEducationProgramLevelResponse";
import { UpdatedEducationProgramLevelResponse } from "../models/responses/educationProgramLevel/updatedEducationProgramLevelResponse";


class EducationProgramLevelService extends BaseService<
    Paginate<GetListEducationProgramLevelResponse>,
    GetEducationProgramLevelResponse,
    AddEducationProgramLevelRequest,
    AddedEducationProgramLevelResponse,
    UpdateEducationProgramLevelRequest,
    UpdatedEducationProgramLevelResponse,
    DeleteEducationProgramLevelRequest
> {
    constructor() {
        super()
        this.apiUrl = "EducationProgramLevels"
    }
}

export default new EducationProgramLevelService();


