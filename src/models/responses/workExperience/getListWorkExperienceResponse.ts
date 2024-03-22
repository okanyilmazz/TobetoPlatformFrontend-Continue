import { Identifier } from "typescript";

export default interface GetListWorkExperienceResponse {
    Id: Identifier;
    cityName: Identifier;
    accountName: Identifier;
    industry: string;
    companyName: string;
    department: string;
    description: string;
    startDate: Date;
    endDate: Date;
}