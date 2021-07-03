import { ObjectType } from "type-graphql"
import { NodeMxn } from "../../mixin/node"
import { UserBase } from "./user.base"

@ObjectType()
export class User extends NodeMxn(UserBase) {}
