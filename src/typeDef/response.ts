import { Field, ObjectType } from "type-graphql";
import { NonEmptyString } from "../scalar-export";

// "Response" collides w/ TS'
@ObjectType("Response"/* , { isAbstract: true } */)
export default class ResponseT {
  @Field(type => NonEmptyString, { nullable: true })
  code?: string
}
