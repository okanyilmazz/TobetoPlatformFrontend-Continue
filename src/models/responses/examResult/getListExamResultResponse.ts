import { Identifier } from "typescript";

export default interface GetListExamResultResponse {
  id: Identifier;
  accountId: Identifier;
  examId: Identifier;
  examName: string;
  correctOptionCount: number;
  inCorrectOptionCount: number;
  emptyOptionCount: number;
  result: number;
  createdDate: Date;
}
