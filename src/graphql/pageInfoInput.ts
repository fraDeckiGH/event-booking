import { PositiveInt } from "graphql-scalars/mocks"
import { InputType, Field } from "type-graphql"
import { JSONScalar } from "../junction/scalar"
import { CursorWrap } from "../resolver/type"
import PageInfo from "./pageInfo"

@InputType()
export default class PageInfoInput implements Partial<PageInfo> {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
  
  @Field(type => PositiveInt)
  size!: number
}
