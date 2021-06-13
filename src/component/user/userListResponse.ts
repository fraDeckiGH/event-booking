import { ObjectType } from "type-graphql"
import { ListResponseMxn } from "../../mixin/listResponse"
import { ResponseT } from "../../typeDef/response"
import { User } from "./user"

@ObjectType()
export class UserListResponse extends 
ListResponseMxn(ResponseT, { 
  Node: User,
}) {}
