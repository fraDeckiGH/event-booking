import { Field, ObjectType } from "type-graphql";
import { NonEmptyString } from "../scalar-export";

// "Response" collides w/ TS'
@ObjectType("Response"/* , { isAbstract: true } */)
export default class ResponseT {
  @Field(() => NonEmptyString, { nullable: true })
  code?: string
  
  /* 
  TODO 
  ? validation might need sth more structured
  in case of error I might return, eg. 
  
  { 
    code: "validation-failed",
    errors: [
      { 
        entity: "user",
        field: "email",
        code: "not-unique"
      },
    ]
  }
  
  (the above is a draft)
  'errors' may also be an object instead of an array
  */
}
