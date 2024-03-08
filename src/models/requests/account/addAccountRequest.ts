import { Identifier } from 'typescript';
export default interface AddAccountRequest {
    addressId: Identifier;
    userId: Identifier;
    phoneNumber: string;
    nationalId: string;
    description: string;
    birthDate: Date;
    profilePhotoPath: string;
}

