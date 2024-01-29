// Role Services

import { StringLiteral } from "typescript";

export interface IRoles{
  title: string ; 
  description: string;
  id?:string;
}
export interface IRolesParams{
  title: string ; 
  description: string;
  id?:string;
}
export interface  IRolesUpdate{
  title: string ; 
  description: string;
  id?: string;
  slug: string;
}

export interface IParams{
  slug:string;
}
// Role Services


// User Services
export interface IUsersParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface loginInput {
  email: string;
  password: string;
}




// public
export interface IPaginationParams{
  search: string ; 
  page: number;
  limit: number;
}
