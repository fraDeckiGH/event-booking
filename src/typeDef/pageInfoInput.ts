import { InputType, Field } from "type-graphql"
import { PositiveInt } from "../scalar-export"
import PageInfo from "./pageInfo"

@InputType()
export default class PageInfoInput extends PageInfo {
  @Field(type => PositiveInt)
  size!: number
}
