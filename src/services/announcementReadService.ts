import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAnnouncementReadRequest from "../models/requests/announcementRead/addAnnouncementReadRequest";
import UpdateAnnouncementReadRequest from "../models/requests/announcementRead/updateAnnouncementReadRequest";
import AddedAnnouncementReadResponse from "../models/responses/announcementRead/addedAnnouncementReadResponse";
import GetAnnouncementReadResponse from "../models/responses/announcementRead/getAnnouncementReadResponse";
import GetListAnnouncementReadResponse from "../models/responses/announcementRead/getListAnnouncementReadResponse";
import UpdatedAnnouncementReadResponse from "../models/responses/announcementRead/updatedAnnouncementReadResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class AnnouncementProjectService extends BaseService<
    Paginate<GetListAnnouncementReadResponse>,
    GetAnnouncementReadResponse,
    AddAnnouncementReadRequest,
    AddedAnnouncementReadResponse,
    UpdateAnnouncementReadRequest,
    UpdatedAnnouncementReadResponse> {
    constructor() {
        super();
        this.apiUrl = "AnnouncementReads";
    }

    getByAccountId(
        accountId: number,
        pageIndex: number,
        pageSize: number
    ): Promise<AxiosResponse<Paginate<GetListAnnouncementReadResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAnnouncementReadResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new AnnouncementProjectService();
