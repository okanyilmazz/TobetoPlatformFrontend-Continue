import { Identifier } from "typescript";

export default interface AddAccountLessonRequest {
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
}