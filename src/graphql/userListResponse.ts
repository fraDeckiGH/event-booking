import { ObjectType, Field } from "type-graphql"
import { NonEmptyString } from "../junction/scalar"
import PageInfo from "./pageInfo"
import User from "./user"

@ObjectType()
export default class UserListResponse {
  @Field(type => NonEmptyString, { nullable: true })
  code?: string
  
  @Field({ nullable: true })
  pageInfo?: PageInfo
  
  @Field(type => [User], { nullable: true })
  node?: User[]
}
