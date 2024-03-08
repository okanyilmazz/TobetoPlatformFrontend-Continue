import { Identifier } from "typescript";

export default interface AddAccountBadgeRequest {
  accountId: Identifier;
  badgeId: Identifier;
}
