import { Identifier } from "typescript";

export default interface DeleteAccountLessonRequest {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}