import { Identifier } from "typescript";

export default interface UpdatedAccountLanguageResponse {
    id: Identifier;
    accountId: Identifier;
    languageId: Identifier;
    languageLevelId: Identifier;
}