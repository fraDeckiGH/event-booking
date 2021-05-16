import { Field, InputType, ObjectType } from "type-graphql";
import { JSONScalar } from "../scalar-export";
import { CursorWrap } from "../typeTS";

@InputType({ isAbstract: true })
@ObjectType()
export default class PageInfo {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
}
