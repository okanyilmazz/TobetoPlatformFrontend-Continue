import { Identifier } from "typescript";

export default interface GetBadgeResponse {
    id: Identifier;
    name: string;
    thumbnailPath: string;
}