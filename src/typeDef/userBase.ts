import { Field, InputType, ObjectType } from "type-graphql"
import { EmailAddress, NonEmptyString } from "../scalar-export"

@InputType(/* "UserBaseInput",  */{ isAbstract: true })
@ObjectType({ isAbstract: true })
export default class UserBase {
  // TODO I want this field to be:
  // required
  // unique (case INsensitive)
  // @IsEmail()
  @Field(() => EmailAddress)
  readonly email!: string
  
  // TODO I want this field to be:
  // required but sparse
  // unique (case sensitive)
  @Field(() => NonEmptyString, { nullable: true })
  readonly nickname?: string
}
