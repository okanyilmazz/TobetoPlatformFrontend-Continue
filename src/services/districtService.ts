import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListDistrictResponse from "../models/responses/district/getListDistrictResponse";
import GetDistrictResponse from "../models/responses/district/getDistrictResponse";
import AddDistrictRequest from "../models/requests/district/addDistrictRequest";
import AddedDistrictResponse from "../models/responses/district/addedDistrictResponse";
import UpdateDistrictRequest from "../models/requests/district/updateDistrictRequest";
import UpdatedDistrictResponse from "../models/responses/district/updatedDistrictResponse";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteDistrictRequest from "../models/requests/district/deleteDistrictRequest";

class DistrictService extends BaseService<
  Paginate<GetListDistrictResponse>,
  GetDistrictResponse,
  AddDistrictRequest,
  AddedDistrictResponse,
  UpdateDistrictRequest,
  UpdatedDistrictResponse,
  DeleteDistrictRequest
> {
  constructor() {
    super();
    this.apiUrl = "Districts";
  }

  getByCityId(
    cityId: number
  ): Promise<AxiosResponse<Paginate<GetListDistrictResponse>, any>> {
    return axiosInstance.get<Paginate<GetListDistrictResponse>>(
      "Districts/GetByCityId?cityId=" + cityId
    );
  }
}

export default new DistrictService();
