import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { GetListCityResponse } from "../models/responses/city/getListCityResponse";
import { GetCityResponse } from "../models/responses/city/getCityResponse";
import AddCityRequest from "../models/requests/city/addCityRequest";
import { AddedCityResponse } from "../models/responses/city/addedCityResponse";
import UpdateCityRequest from "../models/requests/city/updateCityRequest";
import { UpdatedCityResponse } from "../models/responses/city/updatedCityResponse";

class CityService extends BaseService<
  Paginate<GetListCityResponse>,
  GetCityResponse,
  AddCityRequest,
  AddedCityResponse,
  UpdateCityRequest,
  UpdatedCityResponse> {
  constructor() {
    super();
    this.apiUrl = "Cities";
  }
}

export default new CityService();
