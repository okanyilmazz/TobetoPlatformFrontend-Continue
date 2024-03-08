import { Identifier } from "typescript";

export default interface AddedSessionResponse {
    id: Identifier;
    lessonId: Identifier;
    startDate: Date;
    endDate: Date;
    recordPath: string;
}
