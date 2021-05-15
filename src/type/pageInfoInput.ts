import { InputType, Field } from "type-graphql"
import { PositiveInt } from "../_resolver/scalar-export"
import PageInfoBase from "./pageInfoBase"

@InputType()
export default class PageInfoInput extends PageInfoBase {
  @Field(type => PositiveInt)
  size!: number
}
