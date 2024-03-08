import { Identifier } from "typescript";

export default interface AddAnnouncementRequest {
    title: string;
    description: string;
    announcementDate: Date;
    announcementTypeId: Identifier;
}