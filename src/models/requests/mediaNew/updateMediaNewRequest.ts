import { Identifier } from "typescript";

export default interface UpdateMediaNewRequest {
  id: Identifier;
  title: string;
  description: string;
  releaseDate: string;
  thumbnailPath: string;
}
