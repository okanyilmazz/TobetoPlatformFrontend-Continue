import { Identifier } from "typescript";

export default interface GetListAccountSkillResponse {
    id: Identifier;
    accountName: string;
    skillName: string;
}