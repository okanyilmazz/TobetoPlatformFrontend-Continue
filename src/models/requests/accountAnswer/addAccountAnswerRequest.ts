import { Identifier } from "typescript";

export default interface AddAccountAnswerRequest {
    accountId: Identifier;
    examId: Identifier;
    questionId: Identifier;
    givenAnswer: string;
}
