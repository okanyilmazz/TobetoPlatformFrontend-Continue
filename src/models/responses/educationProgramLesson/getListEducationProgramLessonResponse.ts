import { Identifier } from "typescript";

export default interface GetListEducationProgramLessonResponse {
    id: Identifier;
    lessonId: Identifier;
    educationProgramId: Identifier;
    lessonName: string;
    lessonSubTypeName: string;
    educationProgramName: string;
    statusPercent: number;
}