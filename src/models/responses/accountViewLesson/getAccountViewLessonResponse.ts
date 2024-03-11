import { Identifier } from "typescript";

export default interface GetAccountViewLessonResponse {
    id: Identifier
    accountId: Identifier;
    lessonId: Identifier;
}