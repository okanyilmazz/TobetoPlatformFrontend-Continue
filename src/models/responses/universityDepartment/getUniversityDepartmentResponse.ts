import { Identifier } from "typescript";

export default interface GetUniversityDepartmentResponse {
    id: Identifier;
    name: string;
    universityId: Identifier;
}