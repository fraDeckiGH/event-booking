import { ObjectType, Field } from "type-graphql";
import { JSONScalar } from "../junction/scalar";
import { CursorWrap } from "../resolver/type";

@ObjectType()
export default class PageInfo {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
}
