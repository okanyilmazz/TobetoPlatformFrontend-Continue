import { Identifier } from 'typescript';
export default interface DeletedCompetenceResultResponse{
    id:Identifier;
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:number;
}