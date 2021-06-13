import { Field, InputType } from "type-graphql"
import { NonEmptyString } from "../../scalar"
import { TypeBase } from "./typeBase"

@InputType()
export class UserInput extends TypeBase {
  // @Length(8, 20)
  @Field(type => NonEmptyString)
  readonly password!: string
}
