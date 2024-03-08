import { Identifier } from "typescript";

export default interface GetListLessonResponse {
    id: Identifier;
    languageName: string;
    lessonPath: string;
    lessonModuleName: string;
    lessonCategoryName: string;
    lessonSubTypeName: string;
    productionCompanyName: string;
    name: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    languageId: Identifier;
    lessonModuleId: Identifier;
    lessonCategoryId: Identifier;
    lessonSubTypeId: Identifier;
    productionCompanyId: Identifier;
}