import { Identifier } from "typescript";

export default interface UpdatedMediaNewResponse {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
