import { Identifier } from "typescript";

export default interface UpdatedAccountViewLessonResponse {
    id: Identifier
    accountId: Identifier;
    lessonId: Identifier;
}