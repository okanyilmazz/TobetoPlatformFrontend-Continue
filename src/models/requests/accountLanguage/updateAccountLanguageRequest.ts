import { Identifier } from 'typescript';
export default interface UpdateAccountLanguageRequest {
    id: Identifier;
    accountId: Identifier;
    languageId: Identifier;
    languageLevelId: Identifier;
}

