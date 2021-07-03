import { Field, InputType } from "type-graphql"
import { NonEmptyString } from "../../scalar"
import { UserBase } from "./user.base"

@InputType()
export class UserInput extends UserBase {
  // @Length(8, 20)
  @Field(type => NonEmptyString)
  readonly password!: string
}
