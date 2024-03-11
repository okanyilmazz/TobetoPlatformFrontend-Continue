import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListAccountViewLessonResponse from "../models/responses/accountViewLesson/getListAccountViewLessonResponse";
import GetAccountViewLessonResponse from "../models/responses/accountViewLesson/getAccountViewLessonResponse";
import AddAccountViewLessonRequest from "../models/requests/accountViewLesson/addAccountViewLessonRequest";
import DeleteAccountViewLessonRequest from "../models/requests/accountViewLesson/deleteAccountViewLessonRequest";
import UpdateAccountViewLessonRequest from "../models/requests/accountViewLesson/updateAccountViewLessonRequest";
import AddedAccountViewLessonResponse from "../models/responses/accountViewLesson/addedAccountViewLessonResponse";
import UpdatedAccountViewLessonResponse from "../models/responses/accountViewLesson/updatedAccountViewLessonResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";


class AccountViewLessonService extends BaseService<
    Paginate<GetListAccountViewLessonResponse>,
    GetAccountViewLessonResponse,
    AddAccountViewLessonRequest,
    AddedAccountViewLessonResponse,
    UpdateAccountViewLessonRequest,
    UpdatedAccountViewLessonResponse,
    DeleteAccountViewLessonRequest
> {
    constructor() {
        super();
        this.apiUrl = "AccountViewLessons";
    }

    getByAccountId(accountId: string): Promise<AxiosResponse<Paginate<GetListAccountViewLessonResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountViewLessonResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByLessonId(lessonId: string): Promise<AxiosResponse<Paginate<GetListAccountViewLessonResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountViewLessonResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }

    getByAccountIdAndLessonId(accountId: string, lessonId: string): Promise<AxiosResponse<GetAccountViewLessonResponse, any>> {
        return axiosInstance.get<GetListAccountViewLessonResponse>(this.apiUrl + "/GetByAccountIdAndLessonId?accountId=" + accountId + "&lessonId=" + lessonId);
    }
}

export default new AccountViewLessonService();
