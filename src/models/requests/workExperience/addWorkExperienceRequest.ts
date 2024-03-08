import { Identifier } from "typescript";

export default interface AddWorkExperienceRequest {
    cityId: Identifier;
    accountId: Identifier;
    industry: string;
    companyName: string;
    department: string;
    description: string;
    startDate: Date;
    endDate: Date;
}