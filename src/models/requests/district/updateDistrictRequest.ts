import { Identifier } from "typescript";

export default interface UpdateDistrictRequest {
  id: Identifier;
  cityId: Identifier;
  name: string;
}
