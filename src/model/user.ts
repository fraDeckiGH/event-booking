import { IsEmail, Length } from "class-validator";
import { Maybe } from "../util";

class name {
  @IsEmail()
  email!: string
  
  
  name!: string
  
  @Length(8, 20)
  password!: string
  
  constructor({
    obj,
    objKeys,
  }: {
    obj: any,
    objKeys: string[],
  }) {
    objKeys.forEach((key: string) => {
      (this as any)[key] = obj.key
    })
    // for (const key in obj) {
    //   (this as any)[key] = obj.key
    // }
  }
  
  
}

export {name as UserInput}

