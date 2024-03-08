import { Identifier } from "typescript";

export default interface GetAccountBadgeResponse {
  id: Identifier;
  accountName: string;
  badgeThumbnail: string;
}
