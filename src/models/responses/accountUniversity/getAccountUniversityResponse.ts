import { Identifier } from "typescript";

export default interface GetAccountUniversityResponse {
    id: Identifier
    accountName: string;
    degreeTypeName: string;
    universityName: string;
    universityDepartmentName: string;
    startDate: string;
    endDate: string;
    isEducationActive: boolean;
}