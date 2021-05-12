import { InterfaceType, Field, ID } from "type-graphql"
import { EmailAddress, NonEmptyString, Timestamp } from "../junction/scalar"
import NodeI from "./node"

@InterfaceType()
export default abstract class UserI {
  @Field(type => EmailAddress)
  email!: string
  
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
}
