import { ClassType, Field, ObjectType } from "type-graphql"
import PageInfo from "../type/pageInfo"

export default 
function ListResponseMxn<TBase extends ClassType>(Base: TBase) {
  
  // @InputType({ isAbstract: true })
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field({ nullable: true })
    pageInfo?: PageInfo
  }
  
  return Class
}
