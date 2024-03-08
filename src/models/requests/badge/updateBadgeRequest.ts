import { Identifier } from "typescript";

export default interface UpdateBadgeRequest {
    id: Identifier;
    name: string;
    thumbnailPath: string;
}