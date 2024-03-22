import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListLessonSubTypeResponse from "../models/responses/lessonSubType/getListLessonSubTypeResponse";
import GetLessonSubTypeResponse from "../models/responses/lessonSubType/getLessonSubTypeResponse";
import AddLessonSubTypeRequest from "../models/requests/lessonSubType/addLessonSubTypeRequest";
import AddedLessonSubTypeResponse from "../models/responses/lessonSubType/addedLessonSubTypeResponse";
import UpdateLessonSubTypeRequest from "../models/requests/lessonSubType/updateLessonSubTypeRequest";
import UpdatedLessonSubTypeResponse from "../models/responses/lessonSubType/updatedLessonSubTypeResponse";

class LessonSubTypeService extends BaseService<
    Paginate<GetListLessonSubTypeResponse>,
    GetLessonSubTypeResponse,
    AddLessonSubTypeRequest,
    AddedLessonSubTypeResponse,
    UpdateLessonSubTypeRequest,
    UpdatedLessonSubTypeResponse> {
    constructor() {
        super();
        this.apiUrl = "LessonSubTypes";
    }
}

export default new LessonSubTypeService();
