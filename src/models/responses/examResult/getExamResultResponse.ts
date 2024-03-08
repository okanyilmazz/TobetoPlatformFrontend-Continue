import { Identifier } from "typescript";

export default interface GetExamResultResponse {
  id: Identifier;
  accountId: Identifier;
  examId: Identifier;
  examName: string;
  correctOptionCount: number;
  inCorrectOptionCount: number;
  emptyOptionCount: number;
  result: number;
}
