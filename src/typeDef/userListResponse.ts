import { Field, ObjectType } from "type-graphql"
import ListResponseMxn from "../mixin/listResponse"
import ResponseT from "./response"
import User from "./user"

@ObjectType()
export default class UserListResponse extends 
ListResponseMxn(ResponseT) 
{
  @Field(type => [User], { nullable: true })
  node?: User[]
  
  myFunc() { return "ciao" }
}
