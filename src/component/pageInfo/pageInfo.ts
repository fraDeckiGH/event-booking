import { Field, InputType, ObjectType } from "type-graphql"
import { JSONScalar } from "../../scalar"
import { CursorWrap } from "../../type"

@InputType({ isAbstract: true })
@ObjectType()
export class PageInfo {
  @Field(() => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
}
