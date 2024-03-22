import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListLessonCategoryResponse from "../models/responses/lessonCategory/getListLessonCategoryResponse";
import GetLessonCategoryResponse from "../models/responses/lessonCategory/getLessonCategoryResponse";
import AddLessonCategoryRequest from "../models/requests/lessonCategory/addLessonCategoryRequest";
import AddedLessonCategoryResponse from "../models/responses/lessonCategory/addedLessonCategoryResponse";
import UpdateLessonCategoryRequest from "../models/requests/lessonCategory/updateLessonCategoryRequest";
import UpdatedLessonCategoryResponse from "../models/responses/lessonCategory/updatedLessonCategoryResponse";

class LessonCategoryService extends BaseService<
    Paginate<GetListLessonCategoryResponse>,
    GetLessonCategoryResponse,
    AddLessonCategoryRequest,
    AddedLessonCategoryResponse,
    UpdateLessonCategoryRequest,
    UpdatedLessonCategoryResponse> {
    constructor() {
        super();
        this.apiUrl = "LessonCategories";
    }
}

export default new LessonCategoryService();
