import { Identifier } from "typescript";

export default interface ResetTokenUserRequest {
    userId: string;
    resetToken: string;
}