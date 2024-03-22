import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListProductionCompanyResponse from "../models/responses/productionCompany/getListProductionCompanyResponse";
import GetProductionCompanyResponse from "../models/responses/productionCompany/getProductionCompanyResponse";
import AddProductionCompanyRequest from "../models/requests/productionCompany/addProductionCompanyRequest";
import AddedProductionCompanyResponse from "../models/responses/productionCompany/addedProductionCompanyResponse";
import UpdateProductionCompanyRequest from "../models/requests/productionCompany/updateProductionCompanyRequest";
import UpdatedProductionCompanyResponse from "../models/responses/productionCompany/updatedProductionCompanyResponse";

class ProductionCompanyService extends BaseService<
    Paginate<GetListProductionCompanyResponse>,
    GetProductionCompanyResponse,
    AddProductionCompanyRequest,
    AddedProductionCompanyResponse,
    UpdateProductionCompanyRequest,
    UpdatedProductionCompanyResponse> {
    constructor() {
        super();
        this.apiUrl = "ProductionCompanies";
    }
}

export default new ProductionCompanyService();
