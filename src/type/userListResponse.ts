import { Field, ObjectType } from "type-graphql"
import ListResponseMxn from "../mixin/listResponse"
import Response from "./response"
import User from "./user"

@ObjectType()
export default class UserListResponse extends 
ListResponseMxn(Response) {
  @Field(type => [User], { nullable: true })
  node?: User[]
}
