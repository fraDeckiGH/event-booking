import { Field, InputType, ObjectType } from "type-graphql";
import { NonEmptyString } from "../_resolver/scalar-export";

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export default class Response {
  @Field(type => NonEmptyString, { nullable: true })
  code?: string
}
