import { Identifier } from "typescript";

export default interface GetExamResponse {
    id: Identifier;
    name: string;
    description: string;
    duration: number;
    questionCount: number;
}