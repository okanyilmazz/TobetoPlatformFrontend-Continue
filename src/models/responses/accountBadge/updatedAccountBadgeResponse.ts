import { Identifier } from "typescript";

export default interface UpdatedAccountBadgeResponse {
  id: Identifier;
  accountId: Identifier;
  badgeId: Identifier;
}
