import { ObjectType } from "type-graphql";
import UserBase from "./userBase";
import NodeMxn from "../mixin/node";

@ObjectType()
export default class User extends NodeMxn(UserBase) {}
