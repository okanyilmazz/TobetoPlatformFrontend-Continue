import { AxiosResponse } from "axios";
import axiosInstance from "../interceptors/axiosInterceptor";

export class BaseService<
    GetAllType,
    GetByIdType,
    AddRequestType,
    AddResponseType,
    UpdateRequestType,
    UpdateResponseType,
    DeleteRequestType>{

    public apiUrl: string;

    constructor() {
        this.apiUrl = "";
    }

    getAll(pageIndex: number, pageSize: number): Promise<AxiosResponse<GetAllType, any>> {
        return axiosInstance.get<GetAllType>(this.apiUrl + "/GetList?PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }

    getById(id: string): Promise<AxiosResponse<GetByIdType, any>> {
        return axiosInstance.get<GetByIdType>(this.apiUrl + "/GetById?id=" + id);
    }

    add(request: AddRequestType): Promise<AxiosResponse<AddResponseType, any>> {
        return axiosInstance.post<AddResponseType>(this.apiUrl + "/Add", request);
    }

    update(request: UpdateRequestType): Promise<AxiosResponse<UpdateResponseType, any>> {
        return axiosInstance.post<UpdateResponseType>(this.apiUrl + "/Update", request);
    }

    delete(request: DeleteRequestType) {
        return axiosInstance.post(this.apiUrl + "/Delete", request);
    }
}
