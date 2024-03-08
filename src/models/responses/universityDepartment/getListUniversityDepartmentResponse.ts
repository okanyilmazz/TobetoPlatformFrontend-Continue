import { Identifier } from "typescript";

export default interface GetListUniversityDepartmentResponse {
    id: Identifier;
    name: string;
    universityId: Identifier;
}