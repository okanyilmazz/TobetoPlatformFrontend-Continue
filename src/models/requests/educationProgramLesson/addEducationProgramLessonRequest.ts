import { Identifier } from "typescript";

export default interface AddEducationProgramLessonRequest {
    lessonId: Identifier;
    educationProgramId: Identifier;
}