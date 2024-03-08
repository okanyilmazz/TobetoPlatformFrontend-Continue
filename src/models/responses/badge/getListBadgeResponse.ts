import { Identifier } from "typescript";

export default interface GetListBadgeResponse {
    id: Identifier;
    name: string;
    thumbnailPath: string;
}