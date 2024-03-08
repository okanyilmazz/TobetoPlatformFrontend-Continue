import { Identifier } from "typescript";

export default interface UpdateAddressRequest {
    id: Identifier;
    cityId: Identifier;
    accountId: Identifier;
    countryId: Identifier;
    districtId: Identifier;
    addressDetail: string;
}