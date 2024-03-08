import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListLessonResponse from "../models/responses/lesson/getListLessonResponse";
import UpdatedLessonResponse from "../models/responses/lesson/updatedLessonResponse";
import UpdateLessonRequest from "../models/requests/lesson/updateLessonRequest";
import AddedLessonResponse from "../models/responses/lesson/addedLessonResponse";
import AddLessonRequest from "../models/requests/lesson/addLessonRequest";
import GetLessonResponse from "../models/responses/lesson/getLessonResponse";
import DeleteLessonRequest from "../models/requests/lesson/deleteLessonRequest";

class LessonService extends BaseService<
    Paginate<GetListLessonResponse>,
    GetLessonResponse,
    AddLessonRequest,
    AddedLessonResponse,
    UpdateLessonRequest,
    UpdatedLessonResponse,
    DeleteLessonRequest
> {
    constructor() {
        super();
        this.apiUrl = "Lessons";
    }

    getByEducationProgramId(educationId: string): Promise<AxiosResponse<Paginate<GetListLessonResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLessonResponse>>(this.apiUrl + "/GetByEducationProgramId?id=" + educationId);
    }
}

export default new LessonService();
