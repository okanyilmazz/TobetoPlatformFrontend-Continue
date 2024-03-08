import { Identifier } from "typescript";

export default interface UpdateExamRequest {
    id: Identifier;
    name: string;
    description: string;
    duration: number;
    questionCount: number;
}