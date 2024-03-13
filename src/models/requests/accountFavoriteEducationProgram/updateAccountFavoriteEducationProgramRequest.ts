import { Identifier } from "typescript";

export default interface UpdateAccountFavoriteEducationProgramRequest {
    id: Identifier;
    accountId: Identifier;
    educationProgramId: Identifier;
}