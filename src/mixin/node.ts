import { InterfaceType, Field, ID, ClassType, 
  InputType, 
  ObjectType } from "type-graphql"
import { Timestamp } from "../_resolver/scalar-export"

export default 
function NodeMxn<TBase extends ClassType>(Base: TBase) {
  
  // @InputType({ isAbstract: true })
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field(type => ID)
    readonly id!: string
    
    @Field(type => Timestamp)
    readonly ts!: number
  }
  
  return Class
}
