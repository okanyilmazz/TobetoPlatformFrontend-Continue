import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import AddCompetenceResultRequest from "../models/requests/competenceResult/addCompetenceResultRequest";
import UpdateCompetenceResultRequest from "../models/requests/competenceResult/updateCompetenceResultRequest";
import GetListCompetenceResultResponse from "../models/responses/competenceResult/getListCompetenceResultResponse";
import GetCompetenceResultResponse from "../models/responses/competenceResult/getCompetenceResultResponse";
import AddedCompetenceResultResponse from "../models/responses/competenceResult/addedCompetenceResultResponse";
import UpdatedCompetenceResultResponse from "../models/responses/competenceResult/updatedCompetenceResultResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { AxiosResponse } from "axios";

class CompetenceResultService extends BaseService<
  Paginate<GetListCompetenceResultResponse>,
  GetCompetenceResultResponse,
  AddCompetenceResultRequest,
  AddedCompetenceResultResponse,
  UpdateCompetenceResultRequest,
  UpdatedCompetenceResultResponse> {
  constructor() {
    super();
    this.apiUrl = "CompetenceResults";
  }

  getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListCompetenceResultResponse>, any>> {
    return axiosInstance.get<Paginate<GetListCompetenceResultResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
  }
}

export default new CompetenceResultService();
