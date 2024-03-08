import { Identifier } from "typescript";

export default interface AddedAccountSocialMediaResponse {
    id: Identifier
    accountId: Identifier;
    socialMediaId: Identifier;
    url: string;
}