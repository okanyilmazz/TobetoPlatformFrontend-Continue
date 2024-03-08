import { Identifier } from "typescript";

export default interface GetListAccountAnswerResponse {
    Id: Identifier;
    accountId: Identifier;
    examId: Identifier;
    questionId: Identifier;
    givenAnswer: string;
    accountName: string;
    examName: string;
    questionName: string;
}
