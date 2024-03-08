import { Identifier } from "typescript";

export default interface DeleteEducationProgramModuleRequest {
    id: Identifier;
    educationProgramId: Identifier;
    moduleId: Identifier;
}