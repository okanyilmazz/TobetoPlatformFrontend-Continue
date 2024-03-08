import { Identifier } from "typescript";

export default interface UpdatedAccountAnswerResponse {
    Id: Identifier;
    accountId: Identifier;
    examId: Identifier;
    questionId: Identifier;
    givenAnswer: string;
}
