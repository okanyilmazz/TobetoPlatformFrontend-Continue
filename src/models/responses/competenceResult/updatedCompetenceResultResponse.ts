import { Identifier } from 'typescript';
export default interface UpdatedCompetenceResultResponse{
    id:Identifier;
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:number;
}