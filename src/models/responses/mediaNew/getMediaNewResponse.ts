import { Identifier } from "typescript";

export default interface GetMediaNewResponse {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
