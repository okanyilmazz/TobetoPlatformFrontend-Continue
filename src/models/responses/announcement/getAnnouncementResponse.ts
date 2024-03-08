import { Identifier } from "typescript";

export default interface GetAnnouncementResponse {
    id: Identifier;
    title: string;
    description: string;
    announcementDate: Date;
}