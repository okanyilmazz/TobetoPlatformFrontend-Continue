import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListLessonCategoryResponse from "../models/responses/lessonCategory/getListLessonCategoryResponse";
import GetLessonCategoryResponse from "../models/responses/lessonCategory/getLessonCategoryResponse";
import AddLessonCategoryRequest from "../models/requests/lessonCategory/addLessonCategoryRequest";
import AddedLessonCategoryResponse from "../models/responses/lessonCategory/addedLessonCategoryResponse";
import UpdateLessonCategoryRequest from "../models/requests/lessonCategory/updateLessonCategoryRequest";
import UpdatedLessonCategoryResponse from "../models/responses/lessonCategory/updatedLessonCategoryResponse";
import DeleteLessonCategoryRequest from "../models/requests/lessonCategory/deleteLessonCategoryRequest";

class LessonCategoryService extends BaseService<
    Paginate<GetListLessonCategoryResponse>,
    GetLessonCategoryResponse,
    AddLessonCategoryRequest,
    AddedLessonCategoryResponse,
    UpdateLessonCategoryRequest,
    UpdatedLessonCategoryResponse,
    DeleteLessonCategoryRequest

> {
    constructor() {
        super();
        this.apiUrl = "LessonCategories";
    }
}

export default new LessonCategoryService();
