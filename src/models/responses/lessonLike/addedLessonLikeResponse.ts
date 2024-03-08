import { Identifier } from "typescript";

export default interface AddedLessonLikeResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}