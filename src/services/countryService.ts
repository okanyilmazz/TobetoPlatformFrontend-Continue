import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { GetListCountryResponse } from "../models/responses/country/getListCountryResponse";
import { GetCountryResponse } from "../models/responses/country/getCountryResponse";
import AddCountryRequest from "../models/requests/country/addCountryRequest";
import { AddedCountryResponse } from "../models/responses/country/addedCountryResponse";
import UpdateCountryRequest from "../models/requests/country/updateCountryRequest";
import { UpdatedCountryResponse } from "../models/responses/country/updatedCountryResponse";

class CountryService extends BaseService<
    Paginate<GetListCountryResponse>,
    GetCountryResponse,
    AddCountryRequest,
    AddedCountryResponse,
    UpdateCountryRequest,
    UpdatedCountryResponse> {
    constructor() {
        super()
        this.apiUrl = "Countries"
    }
}

export default new CountryService();
