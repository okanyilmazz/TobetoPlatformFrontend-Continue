import { Identifier } from "typescript";

export default interface UpdatedAddressResponse {
    id: Identifier;
    cityId: Identifier;
    countryId: Identifier;
    districtId: Identifier;
    addressDetail: string;
}