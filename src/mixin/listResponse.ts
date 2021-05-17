import { Field, ObjectType } from "type-graphql"
import PageInfo from "../typeDef/pageInfo"
import { GConstructor } from "../typeTS"

export default 
function ListResponseMxn<TBase extends GConstructor>(Base: TBase) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field({ nullable: true })
    pageInfo?: PageInfo
  }
  
  return Class
}
