import { Identifier } from "typescript";

export default interface AddedAccountLessonResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
}