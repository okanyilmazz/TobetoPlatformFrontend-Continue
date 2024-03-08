import { Identifier } from "typescript";

export default interface AddLessonRequest {
    languageId: Identifier;
    lessonModuleId: Identifier;
    lessonCategoryId: Identifier;
    lessonSubTypeId: Identifier;
    productionCompanyId: Identifier;
    name: string;
    lessonPath: string;
    startDate: Date;
    endDate: Date;
    duration: number;
}