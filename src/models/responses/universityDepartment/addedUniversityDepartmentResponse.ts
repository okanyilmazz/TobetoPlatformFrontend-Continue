import { Identifier } from "typescript";

export default interface AddedUniversityDepartmentResponse {
    id: Identifier;
    name: string;
    universityId: Identifier;
}