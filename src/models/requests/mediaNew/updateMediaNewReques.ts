import { Identifier } from "typescript";

export default interface UpdatedMediaNewRequest {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
