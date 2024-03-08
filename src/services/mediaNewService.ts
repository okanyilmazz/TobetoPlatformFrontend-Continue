import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListMediaNewResponse from "../models/responses/mediaNew/getListMediaNewResponse";
import GetMediaNewResponse from "../models/responses/mediaNew/getMediaNewResponse";
import AddMediaNewRequest from "../models/requests/mediaNew/addMediaNewRequest";
import AddedMediaNewResponse from "../models/responses/mediaNew/addedMediaNewResponse";
import UpdatedMediaNewRequest from "../models/requests/mediaNew/updateMediaNewReques";
import UpdatedMediaNewResponse from "../models/responses/mediaNew/updatedMediaNewResponse";
import DeleteMediaNewRequest from "../models/requests/mediaNew/deleteMediaNewRequest";

class MediaNewService extends BaseService<
  Paginate<GetListMediaNewResponse>,
  GetMediaNewResponse,
  AddMediaNewRequest,
  AddedMediaNewResponse,
  UpdatedMediaNewRequest,
  UpdatedMediaNewResponse,
  DeleteMediaNewRequest
> {
  constructor() {
    super();
    this.apiUrl = "MediaNews";
  }
}

export default new MediaNewService();
