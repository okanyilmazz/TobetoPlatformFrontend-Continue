import { Identifier } from "typescript";

export default interface UpdatedAccountSocialMediaResponse {
    id: Identifier
    accountId: Identifier;
    socialMediaId: Identifier;
    url: string;
}