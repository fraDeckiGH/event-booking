// * interfaces, types, etc...

import faunadb/* , { query as q } */ from "faunadb";

export {
  Context,
  CursorWrap,
  dbExpr,
  GConstructor,
}

/**
 * resolver param
 */
type Context = Readonly<{
  db: faunadb.Client
}>
// interface Context { // ? how-to Readonly<interface>
//   db: faunadb.Client
// }

type CursorWrap = Readonly<{
  cursor: any[]
  cursor_id: string
}>

type dbExpr = faunadb.Expr // already readonly

/**
fixes TypeGraphQL's ClassType which lets add props to a class
w/out error

interface ClassType<T = any> { // incorrect
    new (...args: any[]): T;
}
interface ClassTypeFix<T = {}> { // correct
  new (...args: any[]): T;
}

from TypeScript's docs
type GConstructor<T = {}> = new (...args: any[]) => T
 */
type GConstructor<T = {}> = new (...args: any[]) => T
