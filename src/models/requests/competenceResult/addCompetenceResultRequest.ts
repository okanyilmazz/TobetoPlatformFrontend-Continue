import { Identifier } from 'typescript';
export default interface AddCompetenceResultRequest{
    competenceCategoryId:Identifier;
    accountId:Identifier;
    point:number;
}