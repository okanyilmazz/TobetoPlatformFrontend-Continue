import { Identifier } from "typescript";

export default interface GetListAccountLanguageResponse {
    id: Identifier;
    accountId: Identifier;
    languageName: string;
    languageLevelName: string;
}