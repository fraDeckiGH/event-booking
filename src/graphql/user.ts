import { IsEmail, Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
// import { Field } from "type-graphql";
import { Maybe } from "../util";
import { 
  Currency,
  DateTime,
  EmailAddress,
  JSONScalar,
  NonEmptyString,
  PositiveInt,
  Timestamp, 
} from "../junction/scalar";
import NodeI from "./node";

@ObjectType({ implements: NodeI })
export default class User implements NodeI {
  readonly id!: string
  
  @Field(type => EmailAddress)
  email!: string
  
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
  
  readonly ts!: number
}
