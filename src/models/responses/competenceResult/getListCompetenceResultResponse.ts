import { Identifier } from 'typescript';
export default interface GetListCompetenceResultResponse{
    id:Identifier;
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:string;
}