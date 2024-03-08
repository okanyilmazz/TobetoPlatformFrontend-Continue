import { Identifier } from "typescript";

export default interface UpdateEducationProgramLikeRequest {
    id: Identifier;
    accountId: Identifier;
    educationProgramId: string;
}
