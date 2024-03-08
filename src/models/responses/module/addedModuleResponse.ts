import { Identifier } from "typescript";

export default interface AddedModuleResponse {
    id: Identifier;
    name: string;
    parentId: Identifier;
}