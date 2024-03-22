import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddEducationProgramLessonRequest from "../models/requests/educationProgramLesson/addEducationProgramLessonRequest";
import UpdateEducationProgramLessonRequest from "../models/requests/educationProgramLesson/updateEducationProgramLessonRequest";
import AddedEducationProgramLessonResponse from "../models/responses/educationProgramLesson/addedEducationProgramLessonResponse";
import GetEducationProgramLessonResponse from "../models/responses/educationProgramLesson/getEducationProgramLessonResponse";
import GetListEducationProgramLessonResponse from "../models/responses/educationProgramLesson/getListEducationProgramLessonResponse";
import UpdatedEducationProgramLessonResponse from "../models/responses/educationProgramLesson/updatedEducationProgramLessonResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";


class EducationProgramLessonService extends BaseService<
    Paginate<GetListEducationProgramLessonResponse>,
    GetEducationProgramLessonResponse,
    AddEducationProgramLessonRequest,
    AddedEducationProgramLessonResponse,
    UpdateEducationProgramLessonRequest,
    UpdatedEducationProgramLessonResponse> {
    constructor() {
        super()
        this.apiUrl = "EducationProgramLessons"
    }

    getByEducationProgramId(educationProgramId: string): Promise<AxiosResponse<Paginate<GetListEducationProgramLessonResponse>, any>> {
        return axiosInstance.get<Paginate<GetListEducationProgramLessonResponse>>(this.apiUrl + "/GetByEducationProgramId?educationProgramId=" + educationProgramId);
    }
}

export default new EducationProgramLessonService();


