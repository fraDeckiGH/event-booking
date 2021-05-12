import { InterfaceType, Field, ID } from "type-graphql"
import { Timestamp } from "../junction/scalar"

@InterfaceType()
export default abstract class NodeI {
  @Field(type => ID)
  readonly id!: string
  
  @Field(type => Timestamp)
  readonly ts!: number
}
