import { Identifier } from "typescript";

export default interface AddAccountLanguageRequest {
    accountId: Identifier;
    languageId: Identifier;
    languageLevelId: Identifier;
}