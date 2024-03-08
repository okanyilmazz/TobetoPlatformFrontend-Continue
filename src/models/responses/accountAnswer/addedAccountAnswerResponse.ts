import { Identifier } from "typescript";

export default interface AddedAccountAnswerResponse {
    Id: Identifier;
    accountId: Identifier;
    examId: Identifier;
    questionId: Identifier;
    givenAnswer: string;
}
