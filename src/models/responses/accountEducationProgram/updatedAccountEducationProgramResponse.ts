import { Identifier } from "typescript";

export default interface UpdatedAccountEducationProgramResponse {
    id: Identifier;
    accountId: Identifier;
    educationProgramId: Identifier;
    statusPercent: number;
    timeSpent: number;
}