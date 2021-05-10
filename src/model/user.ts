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


@ObjectType()
export class User {
  @Field(type => ID)
  readonly id!: string
  
  @Field(type => Timestamp)
  readonly ts!: number
  
  @Field(type => EmailAddress)
  email!: string
  
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
}

@InputType()
export class UserInput implements Partial<User> {
  @Field(type => EmailAddress)
  email!: string
  
  @Field(type => NonEmptyString, { nullable: true })
  nickname?: string
  
  @Field(type => NonEmptyString)
  password!: string
}
