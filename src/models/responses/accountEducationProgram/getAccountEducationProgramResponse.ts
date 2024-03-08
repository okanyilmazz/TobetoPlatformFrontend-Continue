import { Identifier } from "typescript";

export default interface GetAccountEducationProgramResponse {
    id: Identifier;
    accountName: string;
    educationProgramName: string;
    statusPercent: number;
}