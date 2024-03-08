import { Identifier } from "typescript";

export default interface AddUniversityDepartmentRequest {
    name: string;
    universityId: Identifier;
}