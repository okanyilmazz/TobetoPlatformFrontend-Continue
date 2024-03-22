import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddWorkExperienceRequest from "../models/requests/workExperience/addWorkExperienceRequest";
import UpdateWorkExperienceRequest from "../models/requests/workExperience/updateWorkExperienceRequest";
import AddedWorkExperienceResponse from "../models/responses/workExperience/addedWorkExperienceResponse";
import GetListWorkExperienceResponse from "../models/responses/workExperience/getListWorkExperienceResponse";
import GetWorkExperienceResponse from "../models/responses/workExperience/getWorkExperienceResponse";
import UpdatedWorkExperienceResponse from "../models/responses/workExperience/updatedWorkExperienceResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class WorkExperienceService extends BaseService<
    Paginate<GetListWorkExperienceResponse>,
    GetWorkExperienceResponse,
    AddWorkExperienceRequest,
    AddedWorkExperienceResponse,
    UpdateWorkExperienceRequest,
    UpdatedWorkExperienceResponse>{

    constructor() {
        super()
        this.apiUrl = "WorkExperiences";
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<Paginate<GetListWorkExperienceResponse>, any>> {
        return axiosInstance.get<Paginate<GetListWorkExperienceResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }
}

export default new WorkExperienceService();