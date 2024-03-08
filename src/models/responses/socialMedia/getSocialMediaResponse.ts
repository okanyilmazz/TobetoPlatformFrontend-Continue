import { Identifier } from "typescript";

export default interface GetSocialMediaResponse {
    id: Identifier
    name: string;
    iconPath: string;
    accounts: string;
}