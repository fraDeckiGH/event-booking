import { ObjectType } from "type-graphql";
import NodeMxn from "../mixin/node";
import UserBase from "./userBase";

@ObjectType()
export default class User extends NodeMxn(UserBase) {}
