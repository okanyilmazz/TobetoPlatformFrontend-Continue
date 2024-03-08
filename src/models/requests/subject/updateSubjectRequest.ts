import { Identifier } from "typescript";

export default interface UpdateSubjectRequest {
    id: Identifier;
    name: string;
}