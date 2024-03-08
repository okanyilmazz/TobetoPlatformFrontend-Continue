import { Identifier } from "typescript";

export default interface AddedLessonResponse {
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