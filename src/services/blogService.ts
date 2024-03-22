import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import UpdatedBlogResponse from "../models/responses/blog/updatedBlogResponse";
import UpdateBlogRequest from "../models/requests/blog/updateBlogRequest";
import AddedBlogResponse from "../models/responses/blog/addedBlogResponse";
import AddBlogRequest from "../models/requests/blog/addBlogRequest";
import GetListBlogResponse from "../models/responses/blog/getListBlogResponse";
import GetBlogResponse from "../models/responses/blog/getBlogResponse";


class BlogService extends BaseService<
    Paginate<GetListBlogResponse>,
    GetBlogResponse,
    AddBlogRequest,
    AddedBlogResponse,
    UpdateBlogRequest,
    UpdatedBlogResponse> {
    constructor() {
        super()
        this.apiUrl = "Blogs"
    }


}

export default new BlogService();
