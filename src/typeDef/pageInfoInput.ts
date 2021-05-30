import { InputType, Field } from "type-graphql"
import { JSONScalar, PositiveInt } from "../scalar-export"
import { CursorWrap } from "../typeTS"
import PageInfo from "./pageInfo"

@InputType()
export default class PageInfoInput extends PageInfo {
  @Field(() => JSONScalar, { nullable: true })
  readonly cursorAfter?: CursorWrap
  
  @Field(() => PositiveInt)
  readonly size!: number
}
