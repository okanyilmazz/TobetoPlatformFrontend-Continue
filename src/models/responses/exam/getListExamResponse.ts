import { Identifier } from "typescript";

export default interface GetListExamResponse {
  id: Identifier;
  name: string;
  description: string;
  duration: number;
  questionCount: number;
  questionTypeNames: string[];
}
