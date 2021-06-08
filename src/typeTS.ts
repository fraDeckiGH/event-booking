// * interfaces, types, etc...

import faunadb from "faunadb";

export type {
  CursorWrap,
  dbExpr,
  GConstructor,
  Maybe,
}

/**
 * resolver param
 */
/* type Context = Readonly<{
  db: faunadb.Client
}> */

type CursorWrap = Readonly<{
  cursor: any[]
  cursor_id: string
}>

type dbExpr = faunadb.Expr // already readonly

/**
fixes TypeGraphQL's ClassType which lets add props to a class
w/out error

interface ClassType<T = any> { // * incorrect
    new (...args: any[]): T;
}
interface ClassTypeFix<T = {}> { // * correct
  new (...args: any[]): T;
}

from TypeScript's docs
type GConstructor<T = {}> = new (...args: any[]) => T
 */
type GConstructor<T = {}> = new (...args: any[]) => T

type Maybe<T> = T | undefined
// type Nullable<T> = T | null
// type Optional<T> = T | null | undefined
