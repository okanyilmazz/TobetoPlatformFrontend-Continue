import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListExamResponse from "../models/responses/exam/getListExamResponse";
import GetExamResponse from "../models/responses/exam/getExamResponse";
import AddExamRequest from "../models/requests/exam/addExamRequest";
import AddedExamResponse from "../models/responses/exam/addedExamResponse";
import UpdateExamRequest from "../models/requests/exam/updateExamRequest";
import UpdatedExamResponse from "../models/responses/exam/updatedExamResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteExamRequest from "../models/requests/exam/deleteExamRequest";
import GetListHomeworkResponse from "../models/responses/homework/getListHomeworkResponse";
import GetHomeworkResponse from "../models/responses/homework/getHomeworkResponse";
import AddHomeworkRequest from "../models/requests/homework/addHomeworkRequest";
import DeleteHomeworkRequest from "../models/requests/homework/deleteHomeworkRequest";
import UpdateHomeworkRequest from "../models/requests/homework/updateHomeworkRequest";
import AddedHomeworkResponse from "../models/responses/homework/addedHomeworkResponse";
import UpdatedHomeworkResponse from "../models/responses/homework/updatedHomeworkResponse";

class HomeworkService extends BaseService<
    Paginate<GetListHomeworkResponse>,
    GetHomeworkResponse,
    AddHomeworkRequest,
    AddedHomeworkResponse,
    UpdateHomeworkRequest,
    UpdatedHomeworkResponse,
    DeleteHomeworkRequest
> {
    constructor() {
        super();
        this.apiUrl = "Homeworks";
    }

    getByLessonIdAsync(lessonId: string): Promise<AxiosResponse<Paginate<GetListHomeworkResponse>, any>> {
        return axiosInstance.get<Paginate<GetListHomeworkResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }
}

export default new HomeworkService();




