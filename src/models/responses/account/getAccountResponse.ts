import { Identifier } from 'typescript';
export default interface GetAccountResponse {
    id: Identifier;
    cityId: Identifier;
    districtId: Identifier;
    countryId: Identifier;
    addressId: Identifier;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationalId: string;
    description: string;
    birthDate: Date;
    profilePhotoPath: string;
    email: string;
    occupationClassName: string;
    occupationClassId: string;
}