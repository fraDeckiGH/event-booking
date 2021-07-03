import { Field, InputType } from "type-graphql"
import { JSONScalar, PositiveInt } from "../../scalar"
import { CursorWrap } from "../../type"
import { PageInfo } from "./pageInfo.type"

@InputType()
export class PageInfoInput extends PageInfo {
  @Field(() => JSONScalar, { nullable: true })
  readonly cursorAfter?: CursorWrap
  
  @Field(() => PositiveInt)
  readonly size!: number
}
