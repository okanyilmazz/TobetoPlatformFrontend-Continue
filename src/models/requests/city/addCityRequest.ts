import { Identifier } from "typescript";

export default interface AddCityRequest {
  countryId: Identifier;
  name: string;
}
