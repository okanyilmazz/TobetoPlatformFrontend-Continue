import { Identifier } from "typescript";

export default interface GetAccountLessonResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
}