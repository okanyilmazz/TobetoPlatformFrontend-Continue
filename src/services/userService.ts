import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService"
import { Paginate } from "../models/paginate";
import AddUserRequest from "../models/requests/user/addUserRequest";
import UpdateUserRequest from "../models/requests/user/updateUserRequest";
import AddedUserResponse from "../models/responses/user/addedUserResponse";
import GetListUserResponse from "../models/responses/user/getListUserResponse";
import GetUserResponse from "../models/responses/user/getUserResponse";
import UpdatedUserResponse from "../models/responses/user/updatedUserResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteUserRequest from "../models/requests/user/deleteUserRequest";
import ResetTokenUserRequest from "../models/requests/user/resetTokenRequest";


class UserService extends BaseService<
    Paginate<GetListUserResponse>,
    GetUserResponse,
    AddUserRequest,
    AddedUserResponse,
    UpdateUserRequest,
    UpdatedUserResponse,
    DeleteUserRequest
>{
    constructor() {
        super();
        this.apiUrl = "Users"
    }

    getInstructorList(): Promise<AxiosResponse<Paginate<GetListUserResponse>, any>> {
        return axiosInstance.get<Paginate<GetListUserResponse>>(this.apiUrl + "/GetListInstructor?PageSize=50");
    }


    getByResetToken(resetTokenUserRequest: ResetTokenUserRequest): Promise<AxiosResponse<GetUserResponse, any>> {
        return axiosInstance.post<GetUserResponse>(this.apiUrl + "/GetByResetToken", resetTokenUserRequest);
    }

    getByMail(email: string): Promise<AxiosResponse<GetListUserResponse, any>> {
        return axiosInstance.get<GetListUserResponse>(this.apiUrl + "/GetByMail?email=" + email);
    }




}

export default new UserService();