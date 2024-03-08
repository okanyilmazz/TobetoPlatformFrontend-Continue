import { Identifier } from 'typescript';
export default interface UpdateCompetenceResultRequest{
    id:Identifier;
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:number;
}