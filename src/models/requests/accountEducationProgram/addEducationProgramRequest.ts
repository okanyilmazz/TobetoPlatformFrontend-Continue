import { Identifier } from "typescript";

export default interface AddAccountEducationProgramRequest {
    accountId: Identifier;
    educationProgramId: Identifier;
    statusPercent: number;
    timeSpent: number;
}