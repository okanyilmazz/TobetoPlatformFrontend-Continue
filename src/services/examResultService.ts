import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import GetListExamResultResponse from "../models/responses/examResult/getListExamResultResponse";
import GetExamResultResponse from "../models/responses/examResult/getExamResultResponse";
import AddExamResultRequest from "../models/requests/examResult/addExamResultRequest";
import AddedExamResultResponse from "../models/responses/examResult/addedExamResultResponse";
import UpdatedExamResultResponse from "../models/responses/examResult/updatedExamResultResponse";
import UpdateExamResultRequest from "../models/requests/examResult/updateExamResultRequest";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class ExamResultService extends BaseService<
  Paginate<GetListExamResultResponse>,
  GetExamResultResponse,
  AddExamResultRequest,
  AddedExamResultResponse,
  UpdatedExamResultResponse,
  UpdateExamResultRequest> {
  constructor() {
    super();
    this.apiUrl = "ExamResults";
  }

  getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListExamResultResponse>, any>> {
    return axiosInstance.get<Paginate<GetListExamResultResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
  }
}

export default new ExamResultService();
