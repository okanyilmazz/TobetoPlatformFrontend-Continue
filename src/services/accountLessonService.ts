import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountLessonResponse from "../models/responses/accountLesson/getListAccountLessonResponse";
import GetAccountLessonResponse from "../models/responses/accountLesson/getAccountLessonResponse";
import AddAccountLessonRequest from "../models/requests/accountLesson/addAccountLessonRequest";
import AddedAccountLessonResponse from "../models/responses/accountLesson/addedAccountLessonResponse";
import UpdateAccountLessonRequest from "../models/requests/accountLesson/updateAccountLessonRequest";
import UpdatedAccountLessonResponse from "../models/responses/accountLesson/updatedAccountLessonResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class AccountLessonService extends BaseService<
    Paginate<GetListAccountLessonResponse>,
    GetAccountLessonResponse,
    AddAccountLessonRequest,
    AddedAccountLessonResponse,
    UpdateAccountLessonRequest,
    UpdatedAccountLessonResponse> {
    constructor() {
        super();
        this.apiUrl = "AccountLessons";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListAccountLessonResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountLessonResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByAccountIdAndLessonId(accountId: number, lessonId: string): Promise<AxiosResponse<GetListAccountLessonResponse, any>> {
        return axiosInstance.get<GetListAccountLessonResponse>(this.apiUrl + "/GetByAccountIdAndLessonId?accountId=" + accountId + "&lessonId=" + lessonId);
    }
}

export default new AccountLessonService();
