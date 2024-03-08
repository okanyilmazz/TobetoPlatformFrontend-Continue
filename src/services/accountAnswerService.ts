import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import GetAccountAnswerResponse from "../models/responses/accountAnswer/getAccountAnswerResponse";
import AddAccountAnswerRequest from "../models/requests/accountAnswer/addAccountAnswerRequest";
import AddedAccountAnswerResponse from "../models/responses/accountAnswer/addedAccountAnswerResponse";
import UpdateAccountAnswerRequest from "../models/requests/accountAnswer/updateAccountAnswerRequest";
import UpdatedAccountAnswerResponse from "../models/responses/accountAnswer/updatedAccountAnswerResponse";
import DeleteAccountAnswerRequest from "../models/requests/accountAnswer/deleteAccountAnswerRequest";
import GetListAccountAnswerResponse from "../models/responses/accountAnswer/getListAccountAnswerResponse";

class AccountAnswerService extends BaseService<
    Paginate<GetListAccountAnswerResponse>,
    GetAccountAnswerResponse,
    AddAccountAnswerRequest,
    AddedAccountAnswerResponse,
    UpdateAccountAnswerRequest,
    UpdatedAccountAnswerResponse,
    DeleteAccountAnswerRequest

> {
    constructor() {
        super();
        this.apiUrl = "AccountAnswers";
    }


}

export default new AccountAnswerService();
