import { ClassType, Field, ID, ObjectType } from "type-graphql"
import { Timestamp } from "../scalar-export"

export default 
function NodeMxn<TBase extends ClassType>(Base: TBase) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field(type => ID)
    readonly id!: string
    
    @Field(type => Timestamp)
    readonly ts!: number
  }
  
  return Class
}
