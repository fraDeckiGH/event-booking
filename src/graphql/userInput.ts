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
import User from "./user";
import UserI from "./userI";
import NodeI from "./node";

/* export default class User {
  // TODO I want this field to be:
  // required
  // unique (case INsensitive)
  @IsEmail()
  email!: string
  // email: Maybe<string> = undefined
  
  // TODO I want this field to be:
  // required but sparse
  // unique (case sensitive)
  nickname?: string
  
  @Length(8, 20)
  password!: string
  
  constructor(options: void | {
    obj: any,
    objKeys: string[],
  }) {
    if (!options) {
      return;
    }
    const {
      obj,
      objKeys,
    } = options;
    
    objKeys.forEach((key: string) => {
      (this as any)[key] = obj.key
    })
  }
  
} */

@InputType()
export default class UserInput extends UserI/* Partial<User> */ {
  // email!: string
  
  // nickname?: string
  
  @Field(type => NonEmptyString)
  password!: string
}
