import { Identifier } from "typescript";

export default interface GetAccountSkillResponse {
    id: Identifier;
    accountId: Identifier;
    skillId: Identifier;
}