import { Identifier } from "typescript";

export default interface GetSessionResponse {
    id: Identifier;
    accountName: string;
    occupationClassName: string;
    lessonName: string;
    lessonId: Identifier;
    startDate: Date;
    endDate: Date;
    recordPath: string;
}