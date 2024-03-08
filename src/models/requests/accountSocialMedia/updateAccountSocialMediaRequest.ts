import { Identifier } from "typescript";

export default interface UpdateAccountSocialMediaRequest {
    id: Identifier
    accountId: Identifier;
    socialMediaId: Identifier;
    url: string;
}