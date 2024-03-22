import { Paginate } from './../models/paginate';
import { BaseService } from "../core/services/baseService";
import AddOccupationRequest from "../models/requests/occupation/addOccupationRequest";
import UpdateOccupationRequest from "../models/requests/occupation/updateOccupationRequest";
import AddedOccupationResponse from "../models/responses/occupation/addedOccupationResponse";
import GetListOccupation from "../models/responses/occupation/getListOccupationResponse";
import GetOccupation from "../models/responses/occupation/getOccupationResponse";
import UpdatedOccupationResponse from "../models/responses/occupation/updatedOccupationResponse";
class OccupationService extends BaseService<
    Paginate<GetListOccupation>,
    GetOccupation,
    AddOccupationRequest,
    AddedOccupationResponse,
    UpdateOccupationRequest,
    UpdatedOccupationResponse>{

    constructor() {
        super();
        this.apiUrl = "Occupations"
    }
}

export default new OccupationService();