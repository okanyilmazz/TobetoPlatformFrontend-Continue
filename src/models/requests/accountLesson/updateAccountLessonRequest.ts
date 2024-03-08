import { Identifier } from "typescript";

export default interface UpdateAccountLessonRequest {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
}