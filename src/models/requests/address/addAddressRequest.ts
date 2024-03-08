import { Identifier } from "typescript";

export default interface AddAddressRequest {
    accountId: Identifier;
    cityId: Identifier;
    districtId: Identifier;
    countryId: Identifier;
    addressDetail: string;
}