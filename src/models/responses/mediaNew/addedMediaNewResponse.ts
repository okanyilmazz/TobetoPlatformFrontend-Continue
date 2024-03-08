import { Identifier } from "typescript";

export default interface AddedMediaNewResponse {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
