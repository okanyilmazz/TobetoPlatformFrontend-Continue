import { Identifier } from "typescript";

export default interface AddEducationProgramRequest {
    name: string;
    educationProgramLevelId: Identifier;
    educationProgramDevelopmentId: Identifier;
    badgeId: Identifier;
    description: string;
    thumbnailPath: string;
    duration: string;
    authorizedPerson: string;
    price: number;
    startDate: Date;
    deadline: Date;
}