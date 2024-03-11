import { Identifier } from "typescript";

export default interface UpdateAccountViewLessonRequest {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}