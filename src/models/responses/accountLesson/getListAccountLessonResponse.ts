import { Identifier } from "typescript";

export default interface GetListAccountLessonResponse {
    id: Identifier;
    accountId: Identifier;
    lessonId: Identifier;
    statusPercent: number;
    lessonPath: string;
}