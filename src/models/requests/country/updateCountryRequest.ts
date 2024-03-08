import { Identifier } from "typescript";

export default interface UpdateCountryRequest {
    id: Identifier;
    name: string;
}