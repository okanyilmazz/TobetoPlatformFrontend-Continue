import { Identifier } from "typescript";

export default interface UpdateAccountSkillRequest {
    id: Identifier;
    accountId: Identifier;
    skillId: Identifier;
}