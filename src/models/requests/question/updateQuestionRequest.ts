import { Identifier } from "typescript";

export default interface UpdateQuestionRequest {
    Id: Identifier;
    description: string;
    questionTypeId: Identifier;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
}