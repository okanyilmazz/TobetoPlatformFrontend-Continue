import { Identifier } from "typescript";

export default interface UpdatedUniversityDepartmentResponse {
    id: Identifier;
    name: string;
    universityId: Identifier;
}