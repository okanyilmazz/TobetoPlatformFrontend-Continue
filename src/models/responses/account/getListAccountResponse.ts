import { Identifier } from 'typescript';

export default interface GetListAccountResponse {
    id: Identifier;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationalId: string;
    description: string;
    birthDate: Date;
    profilePhotoPath: string;
    email: string;
    occupationClassName: string
    occupationClassId: string

}