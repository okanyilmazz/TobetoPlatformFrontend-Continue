import { Identifier } from "typescript";

export default interface GetLessonResponse {
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
    languageId: Identifier;
    lessonModuleId: Identifier;
    lessonCategoryId: Identifier;
    lessonSubTypeId: Identifier;
    productionCompanyId: Identifier;
    thumbnailPath: string;
}