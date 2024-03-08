import { Identifier } from "typescript";

export default interface UpdatedAccountLessonResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
}