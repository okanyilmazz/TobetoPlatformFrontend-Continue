import { Identifier } from "typescript";

export default interface UpdatedHomeworkResponse {
    id: Identifier;
    lessonName: string;
    name: string;
    description: string;
    deadline: Date;
}