import { Identifier } from 'typescript';
export default interface UpdateAnnouncementRequest {
    id: Identifier;
    title: string;
    description: string;
    announcementDate: Date;
    announcementTypeId: Identifier;

}