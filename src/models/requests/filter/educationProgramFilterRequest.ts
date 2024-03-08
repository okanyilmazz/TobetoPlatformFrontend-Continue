import { Identifier } from "typescript";

export default interface EducationProgramFilterRequest {
    requestingAccountId: Identifier;
    educationProgramLevelId: Identifier;
    subjectId: Identifier;
    programmingLanguageId: Identifier;
    educationProgramDevelopmentId: Identifier;
    accountId: Identifier;
    completeStatus: number;
    specialForMe: boolean;
    paid: number;
}