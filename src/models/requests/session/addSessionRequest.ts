import { Identifier } from '@babel/types';

export default interface AddSessionRequest {
    lessonId: Identifier;
    startDate: Date;
    endDate: Date;
    recordPath: string;
}