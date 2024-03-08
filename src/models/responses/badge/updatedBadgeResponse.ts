import { Identifier } from "typescript";

export default interface UpdatedBadgeResponse {
    id: Identifier;
    name: string;
    thumbnailPath: string;
}