import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListAnnouncementResponse from "../models/responses/announcement/getListAnnouncementResponse";
import GetAnnouncementResponse from "../models/responses/announcement/getAnnouncementResponse";
import AddAnnouncementRequest from "../models/requests/announcement/addAnnouncementRequest";
import UpdateAnnouncementRequest from "../models/requests/announcement/updateAnnouncementRequest";
import AddedAnnouncementResponse from "../models/responses/announcement/addedAnnouncementResponse";
import UpdatedAnnouncementResponse from "../models/responses/announcement/updatedAnnouncementResponse";
import DeleteAnnouncementRequest from "../models/requests/announcement/deleteAnnouncementRequest";

class AnnouncementProjectService extends BaseService<
    Paginate<GetListAnnouncementResponse>,
    GetAnnouncementResponse,
    AddAnnouncementRequest,
    AddedAnnouncementResponse,
    UpdateAnnouncementRequest,
    UpdatedAnnouncementResponse,
    DeleteAnnouncementRequest
> {
    constructor() {
        super();
        this.apiUrl = "Announcements";
    }


    getByAccountId(
        accountId: number,
        pageIndex: number,
        pageSize: number
    ): Promise<AxiosResponse<Paginate<GetListAnnouncementResponse>, any>> {
        return axiosInstance.get<Paginate<GetListAnnouncementResponse>>(
            this.apiUrl +
            "/GetByAccountId?accountId=" +
            accountId +
            "&PageIndex=" +
            pageIndex +
            "&PageSize=" +
            pageSize
        );
    }
}

export default new AnnouncementProjectService();
