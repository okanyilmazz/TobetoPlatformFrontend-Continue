import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetLessonLikeResponse from "../models/responses/lessonLike/getLessonLikeResponse";
import AddLessonLikeRequest from "../models/requests/lessonLike/addLessonLikeRequest";
import AddedLessonLikeResponse from "../models/responses/lessonLike/addedLessonLikeResponse";
import UpdateLessonLikeRequest from "../models/requests/lessonLike/updateLessonLikeRequest";
import UpdatedLessonLikeResponse from "../models/responses/lessonLike/updatedLessonLikeResponse";
import GetListLessonLikeResponse from "../models/responses/lessonLike/getListLessonLikeResponse";
import DeleteLessonLikeRequest from "../models/requests/lessonLike/deleteLessonLikeRequest";

class LessonLikeService extends BaseService<
    Paginate<GetListLessonLikeResponse>,
    GetLessonLikeResponse,
    AddLessonLikeRequest,
    AddedLessonLikeResponse,
    UpdateLessonLikeRequest,
    UpdatedLessonLikeResponse> {
    constructor() {
        super();
        this.apiUrl = "LessonLikes";
    }

    getByAccountId(accountId: string): Promise<AxiosResponse<Paginate<GetListLessonLikeResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLessonLikeResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByLessonId(lessonId: string): Promise<AxiosResponse<Paginate<GetListLessonLikeResponse>, any>> {
        return axiosInstance.get<Paginate<GetListLessonLikeResponse>>(this.apiUrl + "/GetByLessonId?lessonId=" + lessonId);
    }

    deleteByAccountIdAndLessonId(request: DeleteLessonLikeRequest): any {
        return axiosInstance.post(this.apiUrl + "/DeleteByAccountIdAndLessonId", request);
    }

    getByLessonIdAndAccountId(lessonId: string, accountId: string): Promise<AxiosResponse<GetLessonLikeResponse, any>> {
        return axiosInstance.get<GetLessonLikeResponse>(this.apiUrl + "/GetByLessonIdAndAccountId?lessonId=" + lessonId + "&accountId=" + accountId);
    }
}

export default new LessonLikeService();
