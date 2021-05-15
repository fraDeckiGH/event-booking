import { Field, InputType, ObjectType } from "type-graphql"
import { EmailAddress, NonEmptyString } from "../_resolver/scalar-export"

@InputType(/* "UserBaseInput",  */{ isAbstract: true })
@ObjectType({ isAbstract: true })
export default class UserBase {
  // TODO I want this field to be:
  // required
  // unique (case INsensitive)
  // @IsEmail()
  @Field(type => EmailAddress)
  email!: string
  
  // TODO I want this field to be:
  // required but sparse
  // unique (case sensitive)
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
}
