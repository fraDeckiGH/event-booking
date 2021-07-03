import { ArgsType, Field } from "type-graphql";
import { PageInfoInput } from "../pageInfo";

@ArgsType()
export class ListUserArgs {
  @Field()
  readonly pageInfo!: PageInfoInput
}
