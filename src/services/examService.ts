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

class ExamService extends BaseService<
    Paginate<GetListExamResponse>,
    GetExamResponse,
    AddExamRequest,
    AddedExamResponse,
    UpdateExamRequest,
    UpdatedExamResponse,
    DeleteExamRequest
> {
    constructor() {
        super();
        this.apiUrl = "Exams";
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListExamResponse>, any>> {
        return axiosInstance.get<Paginate<GetListExamResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new ExamService();
