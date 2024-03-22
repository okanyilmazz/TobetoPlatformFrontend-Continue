import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListHomeworkResponse from "../models/responses/homework/getListHomeworkResponse";
import GetHomeworkResponse from "../models/responses/homework/getHomeworkResponse";
import AddHomeworkRequest from "../models/requests/homework/addHomeworkRequest";
import UpdateHomeworkRequest from "../models/requests/homework/updateHomeworkRequest";
import AddedHomeworkResponse from "../models/responses/homework/addedHomeworkResponse";
import UpdatedHomeworkResponse from "../models/responses/homework/updatedHomeworkResponse";

class HomeworkService extends BaseService<
    Paginate<GetListHomeworkResponse>,
    GetHomeworkResponse,
    AddHomeworkRequest,
    AddedHomeworkResponse,
    UpdateHomeworkRequest,
    UpdatedHomeworkResponse> {
    constructor() {
        super();
        this.apiUrl = "Homeworks";
    }

    getByLessonIdAsync(lessonId: string): Promise<AxiosResponse<Paginate<GetListHomeworkResponse>, any>> {
        return axiosInstance.get<Paginate<GetListHomeworkResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }
}

export default new HomeworkService();




