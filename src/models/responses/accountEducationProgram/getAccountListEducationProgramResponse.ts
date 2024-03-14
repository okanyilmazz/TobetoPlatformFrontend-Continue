import { Identifier } from "typescript";

export default interface GetListAccountEducationProgramResponse {
    id: Identifier;
    accountName: string;
    educationProgramName: string;
    statusPercent: number;
    timeSpent: number;
}