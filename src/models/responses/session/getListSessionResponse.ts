import { Identifier } from "typescript";

export default interface GetListSessionResponse {
    id: Identifier;
    accountName: string;
    occupationClassName: string;
    occupationClassId: Identifier;
    lessonName: string;
    startDate: Date;
    endDate: Date;
    recordPath: string;
    lessonId: Identifier;
    accountId: Identifier;
}
