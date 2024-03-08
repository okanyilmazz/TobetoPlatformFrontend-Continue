import { Identifier } from "typescript";

export default interface AddedAccountLanguageResponse {
    id: Identifier;
    accountId: Identifier;
    languageId: Identifier;
    languageLevelId: Identifier;
}