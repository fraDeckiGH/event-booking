import { IsEmail } from "class-validator";
import { Maybe } from "../util";




class name {
  @IsEmail()
  email: Maybe<string>
  
  constructor({
    objLit,
    objLitKeys,
  }: {
    objLit: any,
    objLitKeys: string[],
  }) {
    objLitKeys.forEach((key: string) => {
      (this as any)[key] = objLit.key
    })
    // for (const key in objLit) {
    //   (this as any)[key] = objLit.key
    // }
  }
  
  
}

export {name as UserInput}

