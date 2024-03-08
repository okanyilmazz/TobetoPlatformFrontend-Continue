import { Identifier } from "typescript";

export default interface UpdateModuleRequest {
    id: Identifier;
    name: string;
    parentId: Identifier;
}