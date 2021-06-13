import { ObjectType } from "type-graphql"
import { NodeMxn } from "../../mixin/node"
import { TypeBase } from "./typeBase"

@ObjectType()
export class User extends NodeMxn(TypeBase) {}
