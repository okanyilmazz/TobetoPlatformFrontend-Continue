import { Identifier } from "typescript";

export default interface UpdateExamResultRequest {
  id: Identifier;
  accountId: Identifier;
  examId: Identifier;
  correctOptionCount: number;
  inCorrectOptionCount: number;
  emptyOptionCount: number;
  result: number;
}
