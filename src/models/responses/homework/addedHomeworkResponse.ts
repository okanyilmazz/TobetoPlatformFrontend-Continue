import { Identifier } from "typescript";

export default interface AddedHomeworkResponse {
    id: Identifier;
    lessonName: string;
    name: string;
    description: string;
    deadline: Date;
}