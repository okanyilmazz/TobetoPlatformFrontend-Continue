import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddSkillRequest from "../models/requests/Skill/addSkillRequest";
import UpdateSkillRequest from "../models/requests/Skill/updateSkillRquest";
import AddedSkillResponse from "../models/responses/skill/addedSkillResponse";
import GetListSkillResponse from "../models/responses/skill/getListSkillResponse";
import GetSkillResponse from "../models/responses/skill/getSkillResponse";
import UpdatedSkillResponse from "../models/responses/skill/updatedSkillResponse";


class SkillService extends BaseService<
    Paginate<GetListSkillResponse>,
    GetSkillResponse,
    AddSkillRequest,
    AddedSkillResponse,
    UpdateSkillRequest,
    UpdatedSkillResponse>{

    constructor() {
        super()
        this.apiUrl = "Skills";
    }

}

export default new SkillService();