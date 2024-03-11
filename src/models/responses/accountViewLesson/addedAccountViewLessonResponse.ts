import { Identifier } from "typescript";

export default interface AddedAccountViewLessonResponse {
    id: Identifier
    accountId: Identifier;
    lessonId: Identifier;
}