import { Identifier } from "typescript";

export default interface UpdateUserJustInfoRequest {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
}
