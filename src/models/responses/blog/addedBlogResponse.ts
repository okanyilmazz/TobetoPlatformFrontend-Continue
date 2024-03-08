import { Identifier } from "typescript";

export default interface AddedBlogResponse {
    id: Identifier;
    title: string;
    description: string;
    releaseDate: string;
    thumbnailPath:string;
}