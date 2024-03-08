import { Identifier } from "typescript";

export default interface AddQuestionRequest {
    description: string;
    questionTypeId: Identifier;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
}