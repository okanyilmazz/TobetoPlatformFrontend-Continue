import { Identifier } from "typescript";

export default interface AddAccountSocialMediaRequest {
    accountId: Identifier;
    socialMediaId: Identifier;
    url: string;
}