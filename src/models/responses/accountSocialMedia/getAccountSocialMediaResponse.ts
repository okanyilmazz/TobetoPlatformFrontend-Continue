import { Identifier } from "typescript";

export default interface GetAccountSocialMediaResponse {
    id: Identifier
    accountId: Identifier;
    socialMediaId: Identifier;
    url: string;
}