import Module from "module";
import { Identifier } from "typescript";
import GetListModuleResponse from "../module/getListModuleResponse";

export interface GetListEducationProgramResponse {
    id: Identifier;
    educationProgramLevelId: Identifier
    educationProgramDevelopmentId: Identifier;
    badgeId: Identifier;
    name: string;
    description: string;
    thumbnailPath: string;
    duration: string;
    authorizedPerson: string;
    price: number;
    startDate: Date;
    deadline: Date;
    modules: GetListModuleResponse[];
}