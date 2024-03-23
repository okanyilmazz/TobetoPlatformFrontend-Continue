import { Identifier } from "typescript";

export default interface DeleteLessonLikeRequest {
    accountId: Identifier;
    lessonId: Identifier;
}