import { Identifier } from "typescript";

export default interface AddedBadgeResponse {
    id: Identifier;
    name: string;
    thumbnailPath: string;
}