import { Paginate } from './../models/paginate';
import { BaseService } from "../core/services/baseService";
import AddModuleRequest from '../models/requests/module/addModuleRequest';
import DeleteModuleRequest from '../models/requests/module/deleteModuleRequest';
import UpdateModuleRequest from '../models/requests/module/updateModuleRequest';
import AddedModuleResponse from '../models/responses/module/addedModuleResponse';
import UpdatedModuleResponse from '../models/responses/module/updatedModuleResponse';
import GetListModuleResponse from '../models/responses/module/getListModuleResponse';
import GetModuleResponse from '../models/responses/module/getModuleResponse';


class ModuleService extends BaseService<
    Paginate<GetListModuleResponse>,
    GetModuleResponse,
    AddModuleRequest,
    AddedModuleResponse,
    UpdateModuleRequest,
    UpdatedModuleResponse,
    DeleteModuleRequest
>{

    constructor() {
        super();
        this.apiUrl = "Modules"
    }
}

export default new ModuleService();