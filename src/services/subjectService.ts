import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddSubjectRequest from "../models/requests/subject/addSubjectRequest";
import DeleteSubjectRequest from "../models/requests/subject/deleteSubjectRequest";
import UpdateSubjectRequest from "../models/requests/subject/updateSubjectRequest";
import AddedSubjectResponse from "../models/responses/subject/addedSubjectResponse";
import GetListSubjectResponse from "../models/responses/subject/getListSubjectResponse";
import GetSubjectResponse from "../models/responses/subject/getSubjectResponse";
import UpdatedSubjectResponse from "../models/responses/subject/updatedSubjectResponse";

class SubjectService extends BaseService<
    Paginate<GetListSubjectResponse>,
    GetSubjectResponse,
    AddSubjectRequest,
    AddedSubjectResponse,
    UpdateSubjectRequest,
    UpdatedSubjectResponse,
    DeleteSubjectRequest
>{

    constructor() {
        super()
        this.apiUrl = "Subjects";
    }
}

export default new SubjectService();