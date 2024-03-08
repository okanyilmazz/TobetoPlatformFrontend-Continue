import { Identifier } from "typescript";

export default interface AddAccountSkillRequest {
    accountId: Identifier;
    skillId: Identifier;
}