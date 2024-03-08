import { Identifier } from "typescript";

export default interface AddedAccountBadgeResponse {
  id: Identifier;
  accountId: Identifier;
  badgeId: Identifier;
}
