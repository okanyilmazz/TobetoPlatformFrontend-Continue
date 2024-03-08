import { Identifier } from "typescript";

export default interface UpdatedSessionResponse {
    id: Identifier;
    lessonId: Identifier;
    startDate: Date;
    endDate: Date;
    recordPath: string;
}
