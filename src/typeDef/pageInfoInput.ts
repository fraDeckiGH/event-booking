import { InputType, Field } from "type-graphql"
import { PositiveInt } from "../scalar-export"
import { CursorWrap } from "../typeTS"
import PageInfo from "./pageInfo"

@InputType()
export default class PageInfoInput extends PageInfo {
  readonly cursorAfter?: CursorWrap
  
  @Field(type => PositiveInt)
  readonly size!: number
}
