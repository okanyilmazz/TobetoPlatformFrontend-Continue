import { Identifier } from "typescript";

export default interface AddLessonLikeRequest {
    accountId: Identifier;
    lessonId: Identifier;
}