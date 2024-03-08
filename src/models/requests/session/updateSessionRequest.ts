import { Identifier } from "typescript";

export default interface UpdateSessionRequest {
    id: Identifier;
    lessonId: Identifier;
    startDate: Date;
    endDate: Date;
    recordPath: string;
}