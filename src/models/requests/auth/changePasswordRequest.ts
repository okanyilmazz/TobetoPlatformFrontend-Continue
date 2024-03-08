import { Identifier } from "typescript";

export default interface ChangePasswordRequest {
    userId: string;
    oldPassword: string;
    newPassword: string;
}