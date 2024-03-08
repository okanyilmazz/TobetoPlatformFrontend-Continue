import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { GetListEducationProgramResponse } from "../models/responses/educationProgram/getListEducationProgramResponse";
import { GetEducationProgramResponse } from "../models/responses/educationProgram/getEducationProgramResponse";
import AddEducationProgramRequest from "../models/requests/educationProgram/addEducationProgramRequest";
import UpdateEducationProgramRequest from "../models/requests/educationProgram/updateEducationProgramRequest";
import { AddedEducationProgramResponse } from "../models/responses/educationProgram/addedEducationProgramResponse";
import { UpdatedEducationProgramResponse } from "../models/responses/educationProgram/updatedEducationProgramResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import EducationProgramFilterRequest from "../models/requests/filter/educationProgramFilterRequest";
import DeleteEducationProgramRequest from "../models/requests/educationProgram/deleteEducationProgramRequest";

class EducationProgramService extends BaseService<
    Paginate<GetListEducationProgramResponse>,
    GetEducationProgramResponse,
    AddEducationProgramRequest,
    AddedEducationProgramResponse,
    UpdateEducationProgramRequest,
    UpdatedEducationProgramResponse,
    DeleteEducationProgramRequest

> {
    constructor() {
        super()
        this.apiUrl = "EducationPrograms"
    }

    getByFilter(request: EducationProgramFilterRequest): Promise<AxiosResponse<Paginate<GetListEducationProgramResponse>, any>> {
        return axiosInstance.post<Paginate<GetListEducationProgramResponse>>(this.apiUrl + "/GetListByFiltered", request);
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListEducationProgramResponse>, any>> {
        return axiosInstance.get<Paginate<GetListEducationProgramResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new EducationProgramService();