import { Identifier } from "typescript";

export default interface AddAccountViewLessonRequest {
    accountId: Identifier;
    lessonId: Identifier;
}