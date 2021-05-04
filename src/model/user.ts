import { IsEmail, Length } from "class-validator";
import { Maybe } from "../util";

export default class User {
  // TODO I want this field to be:
  // required
  // unique (case INsensitive)
  @IsEmail()
  email!: string
  // email: Maybe<string> = undefined
  
  // TODO I want this field to be:
  // required but sparse
  // unique (case sensitive)
  nickname!: string
  
  @Length(8, 20)
  password!: string
  
  constructor({
    obj,
    objKeys,
  }: {
    obj: any,
    objKeys: string[],
  }) {
    // objKeys.forEach((key: string) => {
    //   (this as any)[key] = obj.key
    // })
  }
  
}
