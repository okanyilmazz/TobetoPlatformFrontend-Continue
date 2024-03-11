import { Identifier } from "typescript";

export default interface DeleteAccountViewLessonRequest {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}