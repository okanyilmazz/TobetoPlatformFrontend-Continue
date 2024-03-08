import { Identifier } from "typescript";

export default interface UpdateAccountEducationProgramRequest {
    id: Identifier;
    accountId: Identifier;
    educationProgramId: Identifier;
    statusPercent: number;
}