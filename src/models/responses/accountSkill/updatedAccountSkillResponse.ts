import { Identifier } from "typescript";

export default interface UpdatedAccountSkillResponse {
    id: Identifier;
    accountId: Identifier;
    skillId: Identifier;
}