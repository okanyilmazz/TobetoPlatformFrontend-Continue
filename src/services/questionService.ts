import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from './../models/paginate';
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListQuestionResponse from "../models/responses/question/getListQuestionResponse";
import GetQuestionResponse from "../models/responses/question/getQuestionResponse";
import AddQuestionRequest from "../models/requests/question/addQuestionRequest";
import AddedQuestionResponse from "../models/responses/question/addedQuestionResponse";
import UpdateQuestionRequest from "../models/requests/question/updateQuestionRequest";
import UpdatedQuestionResponse from "../models/responses/question/updatedQuestionResponse";
import DeleteQuestionRequest from "../models/requests/question/deleteQuestionRequest";

class QuestionService extends BaseService<
    Paginate<GetListQuestionResponse>,
    GetQuestionResponse,
    AddQuestionRequest,
    AddedQuestionResponse,
    UpdateQuestionRequest,
    UpdatedQuestionResponse,
    DeleteQuestionRequest
> {
    constructor() {
        super()
        this.apiUrl = "Questions"
    }

    getByExamId(Id: string, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListQuestionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListQuestionResponse>>(this.apiUrl + "/GetByExamId?Id=" + Id + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new QuestionService(); 