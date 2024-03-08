import { Identifier } from "typescript";

export default interface AddAccountLanguageRequest {
    Id: Identifier;
    accountId: Identifier;
    languageId: Identifier;
    languageLevelId: Identifier;
}