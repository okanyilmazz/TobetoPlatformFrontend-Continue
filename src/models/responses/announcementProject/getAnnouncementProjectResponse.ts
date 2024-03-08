import { Identifier } from "typescript";
import GetListProjectResponse from "../project/getListProjectResponse";
import GetListAnnouncementResponse from "../announcement/getListAnnouncementResponse";

export default interface GetAnnouncementProjectResponse {
    id: Identifier;
    announcement: GetListAnnouncementResponse;
    project: GetListProjectResponse;
}