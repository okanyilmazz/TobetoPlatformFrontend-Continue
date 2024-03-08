import { Identifier } from "typescript";

export default interface AddedAccountUniversityResponse {
    id: Identifier
    accountId: Identifier;
    degreeTypeId: Identifier;
    universityId: Identifier;
    universityDepartmentId: Identifier;
    startDate: string;
    endDate: string;
    isEducationActive: boolean;
}