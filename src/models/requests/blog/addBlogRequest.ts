import { Identifier } from "typescript";

export default interface AddBlogRequest {
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
