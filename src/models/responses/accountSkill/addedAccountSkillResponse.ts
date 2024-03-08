import { Identifier } from "typescript";

export default interface AddedAccountSkillResponse {
    id: Identifier;
    accountId: Identifier;
    skillId: Identifier;
}