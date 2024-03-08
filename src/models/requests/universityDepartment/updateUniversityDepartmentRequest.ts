import { Identifier } from "typescript";

export default interface UpdateUniversityDepartmentRequest {
    id: Identifier;
    name: string;
    universityId: Identifier;
}