import { Identifier } from "typescript";

export default interface UpdateLessonRequest {
    id: Identifier;
    languageId: Identifier;
    lessonModuleId: Identifier;
    lessonCategoryId: Identifier;
    lessonSubTypeId: Identifier;
    productionCompanyId: Identifier;
    name: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    lessonPath: string;

}