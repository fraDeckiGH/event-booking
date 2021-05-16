import { Field, ObjectType } from "type-graphql"
import ListResponseMxn from "../mixin/listResponse"
import ResponseT from "./response"
import User from "./user"

@ObjectType()
export default class UserListResponse extends 
// ListResponseMxn
ListResponseMxn(ResponseT) 
{
  @Field(type => [User], { nullable: true })
  node?: User[]
  
  ciao() {
    return "ciao"
  }
}

// import PageInfo from "./pageInfo"
// export default class UserListResponse
// {
//   node?: User[]
//   pageInfo?: PageInfo
//   code?: string
// }
