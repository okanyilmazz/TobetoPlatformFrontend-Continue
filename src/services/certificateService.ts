import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";

import GetCertificateResponse from "../models/responses/certificate/getCertificateResponse";
import GetListCertificateResponse from "../models/responses/certificate/getListCertificateResponse";
import AddedCertificateResponse from "../models/responses/certificate/addedCertificateResponse";
import UpdatedCertificateResponse from "../models/responses/certificate/updatedCertificateResponse";
import UpdateCertificateRequest from "../models/requests/certificate/updateCertificateRequest";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { AxiosResponse } from "axios";
import DeleteCertificateRequest from "../models/requests/certificate/deleteCertificateRequest";

class CertificateService extends BaseService<
  Paginate<GetListCertificateResponse>,
  GetCertificateResponse,
  FormData,
  AddedCertificateResponse,
  UpdateCertificateRequest,
  UpdatedCertificateResponse,
  DeleteCertificateRequest
> {
  constructor() {
    super();
    this.apiUrl = "Certificates";
  }
  getByAccountId(
    accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListCertificateResponse>, any>> {
    return axiosInstance.get<Paginate<GetListCertificateResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize
    );
  }
}

export default new CertificateService();
