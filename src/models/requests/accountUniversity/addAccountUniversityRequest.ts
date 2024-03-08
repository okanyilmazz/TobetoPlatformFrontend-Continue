import { Identifier } from "typescript";

export default interface AddAccountUniversityRequest {
    accountId: Identifier;
    degreeTypeId: Identifier;
    universityId: Identifier;
    universityDepartmentId: Identifier;
    startDate: string;
    endDate: string;
    isEducationActive: boolean;
}