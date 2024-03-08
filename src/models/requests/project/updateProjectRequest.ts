import { Identifier } from "@babel/types";

export default interface UpdateProjectRequest {
    id: Identifier;
    name: string;
}