import { Identifier } from "typescript";

export default interface UpdateAccountAnswerRequest {
    Id: Identifier;
    accountId: Identifier;
    examId: Identifier;
    questionId: Identifier;
    givenAnswer: string;
}
