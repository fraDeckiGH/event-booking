import { InterfaceType, Field, ID, InputType, ObjectType, ClassType } from "type-graphql"
import { EmailAddress, NonEmptyString, Timestamp } from "../junction/scalar"
import NodeI from "./node"

// @InterfaceType()
// export default abstract class UserI {
//   @Field(type => EmailAddress)
//   email!: string
  
//   @Field(type => NonEmptyString, { nullable: true })
//   nickname?: string
// }

@ObjectType({ isAbstract: true })
@InputType("UserBaseInput", { isAbstract: true })
export default class UserBase {
  @Field(type => EmailAddress)
  email!: string
  
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
}

/* export default  */
function withId<TClassType extends ClassType>(BaseClass: TClassType) {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class IDTrait extends BaseClass {
    @Field(type => Int)
    id!: number;
  }
  return IDTrait;
}