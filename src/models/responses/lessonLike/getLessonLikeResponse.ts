import { Identifier } from "typescript";

export default interface GetLessonLikeResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
}