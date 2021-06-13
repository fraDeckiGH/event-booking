import { Field, ID, ObjectType } from "type-graphql"
import { GConstructor } from "../type"
import { Timestamp } from "../scalar"

export const NodeMxn = function 
<TBase extends GConstructor>(Base: TBase) {
  
  @ObjectType({ isAbstract: true })
  class Class extends Base {
    @Field(() => ID)
    readonly id!: string
    
    @Field(() => Timestamp)
    readonly ts!: number
  }
  
  return Class
}

// * use the class in a mixin (w/out redefining said class)
// in file: className.ts
// @ObjectType()
// export default class ClassName extends ClassNameMxn(class {}) {}
