import { Identifier } from "typescript";

export default interface AddExamResultRequest {
  accountId: Identifier;
  examId: Identifier;
  correctOptionCount: number;
  inCorrectOptionCount: number;
  emptyOptionCount: number;
  result: number;
}
