import { Identifier } from "typescript";

export default interface GetHomeworkResponse {
    id: Identifier;
    lessonName: string;
    name: string;
    description: string;
    deadline: Date;
}