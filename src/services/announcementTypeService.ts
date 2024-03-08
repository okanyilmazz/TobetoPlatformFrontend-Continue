import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAnnouncementTypeRequest from "../models/requests/announcementType/addAnnouncementTypeRequest";
import DeleteAnnouncementTypeRequest from "../models/requests/announcementType/deleteAnnouncementTypeRequest";
import UpdateAnnouncementTypeRequest from "../models/requests/announcementType/updateAnnouncementTypeRequest";
import AddedAnnouncementTypeResponse from "../models/responses/announcementType/addedAnnouncementTypeResponse";

import GetAnnouncementTypeResponse from "../models/responses/announcementType/getAnnouncementTypeResponse";
import GetListAnnouncementTypeResponse from "../models/responses/announcementType/getListAnnouncementTypeResponse";
import UpdatedAnnouncementTypeResponse from "../models/responses/announcementType/updatedAnnouncementTypeResponse";

class AnnouncementProjectService extends BaseService<
    Paginate<GetListAnnouncementTypeResponse>,
    GetAnnouncementTypeResponse,
    AddAnnouncementTypeRequest,
    AddedAnnouncementTypeResponse,
    UpdateAnnouncementTypeRequest,
    UpdatedAnnouncementTypeResponse,
    DeleteAnnouncementTypeRequest
> {
    constructor() {
        super();
        this.apiUrl = "AnnouncementTypes";
    }
}

export default new AnnouncementProjectService();
