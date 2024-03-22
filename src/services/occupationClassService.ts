import { Paginate } from './../models/paginate';
import { BaseService } from "../core/services/baseService";
import GetListOccupationClassResponse from '../models/responses/occupationClass/getListOccupationClassResponse';
import GetOccupationClassResponse from '../models/responses/occupationClass/getOccupationClassResponse';
import AddOccupationClassRequest from '../models/requests/occupationClass/addOccupationClassRequest';
import AddedOccupationClassResponse from '../models/responses/occupationClass/addedOccupationClassResponse';
import UpdateOccupationClassRequest from '../models/requests/occupationClass/updateOccupationClassRequest';
import UpdatedOccupationClassResponse from '../models/responses/occupationClass/updatedOccupationClassResponse';
class OccupationClassService extends BaseService<
    Paginate<GetListOccupationClassResponse>,
    GetOccupationClassResponse,
    AddOccupationClassRequest,
    AddedOccupationClassResponse,
    UpdateOccupationClassRequest,
    UpdatedOccupationClassResponse>{

    constructor() {
        super();
        this.apiUrl = "OccupationClasses"
    }
}

export default new OccupationClassService();