import { Identifier } from "typescript";

export default interface UpdatedExamResponse {
    id: Identifier;
    name: string;
    description: string;
    duration: number;
    questionCount: number;
}