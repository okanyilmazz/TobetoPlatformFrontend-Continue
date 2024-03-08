import { Identifier } from "typescript";

export default interface GetListMediaNewResponse {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
