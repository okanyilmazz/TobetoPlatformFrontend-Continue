import { Identifier } from 'typescript';
export default interface AddedCompetenceResultResponse{
    id:Identifier;
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:number;
}