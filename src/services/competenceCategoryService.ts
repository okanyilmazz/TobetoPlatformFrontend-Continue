import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListCompetenceCategoryResponse from "../models/responses/competenceCategory/getListCompetenceCategoryResponse";
import GetCompetenceCategoryResponse from "../models/responses/competenceCategory/getCompetenceCategoryResponse";
import AddCompetenceCategoryRequest from "../models/requests/competenceCategory/addCompetenceCategoryRequest";
import AddedCompetenceCategoryResponse from "../models/responses/competenceCategory/addedCompetenceCategoryResponse";
import UpdateCompetenceCategoryRequest from "../models/requests/competenceCategory/updateCompetenceCategoryRequest";
import UpdatedCompetenceCategoryResponse from "../models/responses/competenceCategory/updatedCompetenceCategoryResponse";
import DeleteCompetenceCategoryRequest from "../models/requests/competenceCategory/deleteCompetenceCategoryRequest";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class CompetenceCategoryService extends BaseService<
  Paginate<GetListCompetenceCategoryResponse>,
  GetCompetenceCategoryResponse,
  AddCompetenceCategoryRequest,
  AddedCompetenceCategoryResponse,
  UpdateCompetenceCategoryRequest,
  UpdatedCompetenceCategoryResponse,
  DeleteCompetenceCategoryRequest
> {
  constructor() {
    super();
    this.apiUrl = "CompetenceCategories";
  }

}

export default new CompetenceCategoryService();
