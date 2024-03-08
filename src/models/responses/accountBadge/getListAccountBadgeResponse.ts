import { Identifier } from "typescript";

export default interface GetListAccountBadgeResponse {
  id: Identifier;
  accountName: string;
  badgeThumbnail: string;
}
