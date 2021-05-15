import { InputType, ObjectType, Field } from "type-graphql";
import { JSONScalar } from "../_resolver/scalar-export";
import { CursorWrap } from "../_resolver/type";

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export default class PageInfoBase {
  @Field(type => JSONScalar, { nullable: true })
  cursorAfter?: CursorWrap
}
