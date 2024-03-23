import { Identifier } from "typescript";

export default interface DeleteEducationProgramLikeRequest {
    accountId: Identifier;
    educationProgramId: string;
}