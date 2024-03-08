import { Identifier } from "typescript";

export default interface AddedAnnouncementResponse {
    id: Identifier;
    title: string;
    description: string;
    announcementDate: Date;
}