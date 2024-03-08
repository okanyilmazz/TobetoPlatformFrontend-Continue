import { Identifier } from "typescript";

export default interface GetListAddressResponse {
    id: Identifier;
    cityId: Identifier;
    countryId: Identifier;
    districtId: Identifier;
    addressDetail: string;
}
