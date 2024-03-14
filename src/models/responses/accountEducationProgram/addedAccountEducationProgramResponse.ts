import { Identifier } from "typescript";

export default interface AddedAccountEducationProgramResponse {
    id: Identifier;
    accountId: Identifier;
    educationProgramId: Identifier;
    statusPercent: number;
    timeSpent: number;
}