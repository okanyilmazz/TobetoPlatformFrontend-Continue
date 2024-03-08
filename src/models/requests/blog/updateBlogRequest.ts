import { Identifier } from "typescript";

export default interface UpdateBlogRequest {
    id: Identifier;
    title: string;
    description: string;
    releaseDate: string;
    thumbnailPath:string;
}