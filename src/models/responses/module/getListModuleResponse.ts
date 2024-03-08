import { Identifier } from "typescript";
import GetListLessonResponse from "../lesson/getListLessonResponse";

export default interface GetListModuleResponse {
    id: Identifier;
    name: string;
    parentId: Identifier;
    children: GetListModuleResponse[];
    lessons: GetListLessonResponse[];
}