import GetListAnnouncementResponse from '../announcement/getListAnnouncementResponse';
import GetListProjectResponse from '../project/getListProjectResponse';
import { Identifier } from "typescript";

export default interface GetListAnnouncementProjectResponse {
    id: Identifier;
    announcement: GetListAnnouncementResponse;
    project: GetListProjectResponse;
}