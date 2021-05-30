import { ObjectType } from "type-graphql"
import ListResponseMxn from "../mixin/listResponse"
import ResponseT from "./response"
import User from "./user"

@ObjectType()
export default class UserListResponse extends 
ListResponseMxn(ResponseT, { 
  Node: User,
}) {}
