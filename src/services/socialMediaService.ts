import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddSocialMediaRequest from "../models/requests/socialMedia/addSocialMediaRequest";
import UpdateSocialMediaRequest from "../models/requests/socialMedia/updateSocialMediaRequest";
import AddedSocialMediaResponse from "../models/responses/socialMedia/addedSocialMediaResponse";
import GetListSocialMediaResponse from "../models/responses/socialMedia/getListSocialMediaResponse";
import GetSocialMediaResponse from "../models/responses/socialMedia/getSocialMediaResponse";
import UpdatedSocialMediaResponse from "../models/responses/socialMedia/updatedSocialMediaResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import DeleteSocialMediaRequest from "../models/requests/socialMedia/deleteSocialMediaRequest";

class SocialMediaService extends BaseService<
  Paginate<GetListSocialMediaResponse>,
  GetSocialMediaResponse,
  AddSocialMediaRequest,
  AddedSocialMediaResponse,
  UpdateSocialMediaRequest,
  UpdatedSocialMediaResponse,
  DeleteSocialMediaRequest
> {
  constructor() {
    super();
    this.apiUrl = "SocialMedias";
  }

  getByAccountId(
    accountId: number,
    pageIndex: number,
    pageSize: number
  ): Promise<AxiosResponse<Paginate<GetListSocialMediaResponse>, any>> {
    return axiosInstance.get<Paginate<GetListSocialMediaResponse>>(
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

export default new SocialMediaService();
