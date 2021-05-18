import { Field, ID, ObjectType } from "type-graphql"
import { Timestamp } from "../scalar-export"
import { GConstructor } from "../typeTS"

export default 
function NodeMxn<TBase extends GConstructor>(Base: TBase) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field(type => ID)
    readonly id!: string
    
    @Field(type => Timestamp)
    readonly ts!: number
  }
  
  return Class
}

// * use the class in a mixin (w/out redefining said class)
// in file: className.ts
// @ObjectType()
// export default class ClassName extends ClassNameMxn(class {}) {}
