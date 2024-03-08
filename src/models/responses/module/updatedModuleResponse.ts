import { Identifier } from "typescript";

export default interface UpdatedModuleResponse {
    id: Identifier;
    name: string;
    parentId: Identifier;
}