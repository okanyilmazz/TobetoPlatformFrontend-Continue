import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetBadgeResponse from "../models/responses/badge/getBadgeResponse";
import AddBadgeRequest from "../models/requests/badge/addBadgeRequest";
import AddedBadgeResponse from "../models/responses/badge/addedBadgeResponse";
import UpdateBadgeRequest from "../models/requests/badge/updateBadgeRequest";
import UpdatedBadgeResponse from "../models/responses/badge/updatedBadgeResponse";
import DeleteBadgeRequest from "../models/requests/badge/deleteBadgeRequest";
import GetListBadgeResponse from "../models/responses/badge/getListBadgeResponse";


class BadgeService extends BaseService<
    Paginate<GetListBadgeResponse>,
    GetBadgeResponse,
    AddBadgeRequest,
    AddedBadgeResponse,
    UpdateBadgeRequest,
    UpdatedBadgeResponse,
    DeleteBadgeRequest
> {
    constructor() {
        super()
        this.apiUrl = "Badges"
    }
}

export default new BadgeService();
