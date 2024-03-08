import { Identifier } from "typescript";

export default interface UpdatedAnnouncementResponse {
    id: Identifier;
    title: string;
    description: string;
    announcementDate: Date;
    announcementTypeId: Identifier;
}