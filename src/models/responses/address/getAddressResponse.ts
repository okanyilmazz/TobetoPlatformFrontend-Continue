import { Identifier } from "typescript";

export default interface GetAddressResponse {
    id: Identifier;
    cityId: Identifier;
    countryId: Identifier;
    districtId: Identifier;
    addressDetail: string;
}
