import { Field, InputType } from "type-graphql";
import { NonEmptyString } from "../_resolver/scalar-export";
import UserBase from "./userBase";

@InputType()
export default class UserInput extends UserBase {
  // @Length(8, 20)
  @Field(type => NonEmptyString)
  password!: string
}
