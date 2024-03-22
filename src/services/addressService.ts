import { AxiosResponse } from "axios";
import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/paginate";
import AddAddressRequest from "../models/requests/address/addAddressRequest";
import UpdateAddressRequest from "../models/requests/address/updateAddressRequest";
import AddedAddressResponse from "../models/responses/address/addedAddressResponse";
import GetAddressResponse from "../models/responses/address/getAddressResponse";
import GetListAddressResponse from "../models/responses/address/getListAddressResponse";
import UpdatedAddressResponse from "../models/responses/address/updatedAddressResponse";
import axiosInstance from "../core/interceptors/axiosInterceptor";

class AddressService extends BaseService<
    Paginate<GetListAddressResponse>,
    GetAddressResponse,
    AddAddressRequest,
    AddedAddressResponse,
    UpdateAddressRequest,
    UpdatedAddressResponse>{
    constructor() {
        super()
        this.apiUrl = "Addresses"
    }

    getByAccountId(accountId: number): Promise<AxiosResponse<GetAddressResponse, any>> {
        return axiosInstance.get<GetAddressResponse>(this.apiUrl + "/GetByAccountId?accountId=" + accountId);
    }
}

export default new AddressService();
