import { Identifier } from "typescript";

export default interface DeleteAccountSkillRequest {
    id: Identifier;
    accountId: Identifier;
    skillId: Identifier;
}