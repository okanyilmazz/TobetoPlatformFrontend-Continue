import { Identifier } from "typescript";

export default interface UpdateCityRequest {
  id: Identifier;
  countryId: Identifier;
  name: string;
}
