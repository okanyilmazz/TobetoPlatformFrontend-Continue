import { BaseService } from "../core/services/baseService";
import GetListAnnouncementProjectResponse from "../models/responses/announcementProject/getListAnnouncementProjectResponse";
import GetAnnouncementProjectResponse from "../models/responses/announcementProject/getAnnouncementProjectResponse";
import AddAnnouncementProjectRequest from "../models/requests/announcementProject/addAnnouncementProjectRequest";
import AddedAnnouncementProjectResponse from "../models/responses/announcementProject/addedAnnouncementProjectResponse";
import UpdateAnnouncementProjectRequest from "../models/requests/announcementProject/updateAnnouncementProjectRequest";
import UpdatedAnnouncementProjectResponse from "../models/responses/announcementProject/updatedAnnouncementProjectResponse";
import { Paginate } from "../models/paginate";
import DeleteAnnouncementProjectRequest from "../models/requests/announcementProject/deleteAnnouncementProjectRequest";

class AnnouncementProjectService extends BaseService<
    Paginate<GetListAnnouncementProjectResponse>,
    GetAnnouncementProjectResponse,
    AddAnnouncementProjectRequest,
    AddedAnnouncementProjectResponse,
    UpdateAnnouncementProjectRequest,
    UpdatedAnnouncementProjectResponse,
    DeleteAnnouncementProjectRequest
> {
    constructor() {
        super()
        this.apiUrl = "AnnouncementProjects"
    }
}

export default new AnnouncementProjectService();