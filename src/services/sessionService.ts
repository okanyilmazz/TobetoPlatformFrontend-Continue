import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import AddSessionRequest from "../models/requests/session/addSessionRequest";
import DeleteSessionRequest from "../models/requests/session/deleteSessionRequest";
import UpdateSessionRequest from "../models/requests/session/updateSessionRequest";
import AddedSessionResponse from "../models/responses/session/addedSessionResponse";
import GetListSessionResponse from "../models/responses/session/getListSessionResponse";
import GetSessionResponse from "../models/responses/session/getSessionResponse";
import UpdatedSessionResponse from "../models/responses/session/updatedSessionResponse";
import { Paginate } from './../models/paginate';
import axiosInstance from "../core/interceptors/axiosInterceptor";

class SessionService extends BaseService<
    Paginate<GetListSessionResponse>,
    GetSessionResponse,
    AddSessionRequest,
    AddedSessionResponse,
    UpdateSessionRequest,
    UpdatedSessionResponse,
    DeleteSessionRequest
> {
    constructor() {
        super()
        this.apiUrl = "Sessions"
    }

    getInstructorList(pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListSessionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListSessionResponse>>(this.apiUrl + "/GetListWithInstructor?PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }

    getByLessonId(lessonId: string): Promise<AxiosResponse<Paginate<GetListSessionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListSessionResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }

    getByAccountAndLessonId(accountId: string, lessonId: string): Promise<AxiosResponse<Paginate<GetListSessionResponse>, any>> {
        return axiosInstance.get<Paginate<GetListSessionResponse>>(this.apiUrl + "/GetByAccountAndLessonId?accountId=" + accountId + "&lessonId=" + lessonId);
    }
}

export default new SessionService(); 