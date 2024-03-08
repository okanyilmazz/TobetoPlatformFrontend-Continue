import { Identifier } from "typescript";

export default interface UpdateHomeworkRequest {
    id: Identifier;
    lessonName: string;
    name: string;
    description: string;
    deadline: Date;
}