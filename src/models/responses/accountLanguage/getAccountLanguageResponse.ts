import { Identifier } from "typescript";

export default interface GetAccountLanguageResponse {
    id: Identifier;
    accountId: Identifier;
    languageName: string;
    languageLevelName: string;
}