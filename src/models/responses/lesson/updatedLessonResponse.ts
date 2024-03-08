import { Identifier } from "typescript";

export default interface UpdatedLessonResponse {
    id: Identifier;
    languageName: string;
    lessonModuleName: string;
    lessonCategoryName: string;
    lessonSubTypeName: string;
    productionCompanyName: string;
    name: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    lessonPath: string;
}