import { Identifier } from "typescript";

export default interface GetListAccountSocialMediaResponse {
    id: Identifier;
    socialMediaId: Identifier;
    accountName: string;
    socialMediaName: string;
    url: string;
    iconPath: string;
}