import { Identifier } from "typescript";

export default interface UpdateSocialMediaRequest {
    id: Identifier
    name: string;
    iconPath: string;
}