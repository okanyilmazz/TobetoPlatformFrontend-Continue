import { Identifier } from "typescript";

export default interface GetModuleResponse {
    id: Identifier;
    name: string;
    parentId: Identifier;
}