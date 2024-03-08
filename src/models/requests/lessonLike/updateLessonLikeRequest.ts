import { Identifier } from "typescript";

export default interface UpdateLessonLikeRequest {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}