import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetListProductionCompanyResponse from "../models/responses/productionCompany/getListProductionCompanyResponse";
import GetProductionCompanyResponse from "../models/responses/productionCompany/getProductionCompanyResponse";
import AddProductionCompanyRequest from "../models/requests/productionCompany/addProductionCompany";
import AddedProductionCompanyResponse from "../models/responses/productionCompany/addedProductionCompanyResponse";
import UpdateProductionCompanyRequest from "../models/requests/productionCompany/updateProductionCompany";
import UpdatedProductionCompanyResponse from "../models/responses/productionCompany/updatedProductionCompanyResponse";
import DeleteProductionCompanyRequest from "../models/requests/productionCompany/deleteProductionCompany";

class ProductionCompanyService extends BaseService<
    Paginate<GetListProductionCompanyResponse>,
    GetProductionCompanyResponse,
    AddProductionCompanyRequest,
    AddedProductionCompanyResponse,
    UpdateProductionCompanyRequest,
    UpdatedProductionCompanyResponse,
    DeleteProductionCompanyRequest

> {
    constructor() {
        super();
        this.apiUrl = "ProductionCompanies";
    }
}

export default new ProductionCompanyService();
