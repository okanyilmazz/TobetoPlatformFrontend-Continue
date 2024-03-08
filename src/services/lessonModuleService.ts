import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetLessonModuleResponse from "../models/responses/lessonModule/getLessonModuleResponse";
import AddLessonModuleRequest from "../models/requests/lessonModule/addLessonModuleRequest";
import AddedLessonModuleResponse from "../models/responses/lessonModule/addedLessonModuleResponse";
import UpdateLessonModuleRequest from "../models/requests/lessonModule/updateLessonModuleRequest";
import UpdatedLessonModuleResponse from "../models/responses/lessonModule/updatedLessonModuleResponse";
import GetListLessonModuleResponse from "../models/responses/lessonModule/getListLessonModuleResponse";
import DeleteLessonModuleRequest from "../models/requests/lessonModule/deleteLessonModuleRequest";

class LessonModuleService extends BaseService<
    Paginate<GetListLessonModuleResponse>,
    GetLessonModuleResponse,
    AddLessonModuleRequest,
    AddedLessonModuleResponse,
    UpdateLessonModuleRequest,
    UpdatedLessonModuleResponse,
    DeleteLessonModuleRequest

> {
    constructor() {
        super();
        this.apiUrl = "LessonModules";
    }

    getByAccountId(moduleId: string): Promise<AxiosResponse<Paginate<GetListLessonModuleResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLessonModuleResponse>>(this.apiUrl + "/GetByModuleId?moduleId=" + moduleId);
    }

    getByLessonId(lessonId: string): Promise<AxiosResponse<Paginate<GetListLessonModuleResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLessonModuleResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }

    deleteByAccountIdAndLessonId(request: DeleteLessonModuleRequest): any {
        return axiosInstance.post(this.apiUrl + "/DeleteByModuleIdAndLessonId", request);
    }
}

export default new LessonModuleService();
