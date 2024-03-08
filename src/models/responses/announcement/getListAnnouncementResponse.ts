import { Id } from "react-toastify";
import { Identifier } from "typescript";

export default interface GetListAnnouncementResponse {
    id: Identifier;
    title: string;
    description: string;
    announcementDate: Date;
    announcementTypeName: string
    announcementTypeId: Identifier

}