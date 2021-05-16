import { ClassType, Field, ObjectType } from "type-graphql"
import PageInfo from "../typeDef/pageInfo"

export default 
function ListResponseMxn<TBase extends ClassType>(Base: TBase) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field({ nullable: true })
    pageInfo?: PageInfo
  }
  
  return Class
}

// import ResponseT from "../typeDef/response"
// @ObjectType({ isAbstract: true })
// export default class ListResponseMxn extends ResponseT
// {
//   @Field({ nullable: true })
//   pageInfo?: PageInfo
// }
