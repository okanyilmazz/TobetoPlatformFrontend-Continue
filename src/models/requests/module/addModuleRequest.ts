import { Identifier } from "typescript";

export default interface AddModuleRequest {
    name: string;
    parentId: Identifier;
}