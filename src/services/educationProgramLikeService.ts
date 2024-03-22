import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListEducationProgramLikeResponse from "../models/responses/educationProgramLike/getListEducationProgramLikeResponse";
import GetEducationProgramLikeResponse from "../models/responses/educationProgramLike/getEducationProgramLikeResponse";
import AddEducationProgramLikeRequest from "../models/requests/educationProgramLike/addEducationProgramLikeRequest";
import UpdateEducationProgramLikeRequest from "../models/requests/educationProgramLike/updateEducationProgramLikeRequest";
import AddedEducationProgramLikeResponse from "../models/responses/educationProgramLike/addedEducationProgramLikeResponse";
import UpdatedEducationProgramLikeResponse from "../models/responses/educationProgramLike/updatedEducationProgramLikeResponse";


class EducationProgramLikeService extends BaseService<
    Paginate<GetListEducationProgramLikeResponse>,
    GetEducationProgramLikeResponse,
    AddEducationProgramLikeRequest,
    AddedEducationProgramLikeResponse,
    UpdateEducationProgramLikeRequest,
    UpdatedEducationProgramLikeResponse> {
    constructor() {
        super();
        this.apiUrl = "EducationProgramLikes";
    }

    getByAccountId(accountId: string): Promise<AxiosResponse<Paginate<GetListEducationProgramLikeResponse>, any>> {
        return axiosInstance.get<Paginate<GetListEducationProgramLikeResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }

    getByEducationProgramId(educationProgramId: string): Promise<AxiosResponse<Paginate<GetListEducationProgramLikeResponse>, any>> {
        return axiosInstance.get<Paginate<GetListEducationProgramLikeResponse>>(this.apiUrl + "/GetByEducationProgramId?educationProgramId=" + educationProgramId);
    }

    deleteByAccountIdAndEducationProgramId(accountId: any, educationProgramId: any) {
        return axiosInstance.delete(this.apiUrl + "/accountId=" + accountId + "&educationProgramId=" + educationProgramId);
    }

    getByEducationProgramIdAndAccountId(educationProgramId: string, accountId: string): Promise<AxiosResponse<GetEducationProgramLikeResponse, any>> {
        return axiosInstance.get<GetEducationProgramLikeResponse>(this.apiUrl + "/GetByEducationProgramIdAndAccountId?educationProgramId=" + educationProgramId + "&accountId=" + accountId);
    }
}
export default new EducationProgramLikeService();