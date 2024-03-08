import { Identifier } from "typescript";

export default interface UpdatedBlogResponse {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
