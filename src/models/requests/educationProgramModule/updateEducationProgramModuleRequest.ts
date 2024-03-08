import { Identifier } from "typescript";

export default interface UpdateEducationProgramModuleRequest {
    id: Identifier;
    educationProgramId: Identifier;
    moduleId: Identifier;
}