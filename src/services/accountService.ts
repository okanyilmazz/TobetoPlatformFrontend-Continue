import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAccountRequest from "../models/requests/account/addAccountRequest";
import UpdateAccountRequest from "../models/requests/account/updateAccountRequest";
import AddedAccountResponse from "../models/responses/account/addedAccountResponse";
import GetAccountResponse from "../models/responses/account/getAccountResponse";
import GetListAccountResponse from "../models/responses/account/getListAccountResponse";
import UpdatedAccountResponse from "../models/responses/account/updatedAccountResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { Identifier } from "typescript";


class AccountService extends BaseService<
    Paginate<GetListAccountResponse>,
    GetAccountResponse,
    AddAccountRequest,
    AddedAccountResponse,
    UpdateAccountRequest,
    UpdatedAccountResponse>{
    constructor() {
        super()
        this.apiUrl = "Accounts"
    }
    getByLessonIdForLike(lessonId: Identifier, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListAccountResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountResponse>>(this.apiUrl + "/GetByLessonIdForLike?lessonId=" + lessonId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize)
    }

    getByEducationProgramIdForLike(educationProgramId: string, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListAccountResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountResponse>>(this.apiUrl + "/GetByEducationProgramIdForLike?educationProgramId=" + educationProgramId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize)
    }

    getInstructorBySessionId(sessionId: string): Promise<AxiosResponse<Paginate<GetListAccountResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountResponse>>(this.apiUrl + "/GetInstructorBySessionId?sessionId=" + sessionId)
    }

    getStudentBySessionId(sessionId: string): Promise<AxiosResponse<Paginate<GetListAccountResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAccountResponse>>(this.apiUrl + "/GetStudentBySessionId?sessionId=" + sessionId)
    }

    uploadProfilePhoto(formData: FormData): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.put<boolean>(this.apiUrl + "/Image", formData);
    }

    addProfilePhoto(formData: FormData): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.post<boolean>(this.apiUrl + "/Image", formData);
    }

    deleteProfilePhoto(id: string) {
        return axiosInstance.delete(this.apiUrl + "/Image/" + id);
    }
}

export default new AccountService();