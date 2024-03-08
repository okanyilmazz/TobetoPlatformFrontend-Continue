import { Identifier } from "typescript";

export default interface UpdateAccountBadgeRequest {
  id: Identifier;
  accountId: Identifier;
  badgeId: Identifier;
}
