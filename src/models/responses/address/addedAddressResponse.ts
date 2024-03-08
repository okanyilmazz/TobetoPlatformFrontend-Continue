import { Identifier } from "typescript";

export default interface AddedAddressResponse {
    id: Identifier;
    cityId: Identifier;
    countryId: Identifier;
    districtId: Identifier;
    addressDetail: string;
}