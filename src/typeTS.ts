// * interfaces, types, etc...

import faunadb/* , { query as q } */ from "faunadb";

export {
  Context,
  CursorWrap,
  dbExpr,
}

/**
 * resolver param
 */
type Context = {
  db: faunadb.Client
}

type CursorWrap = {
  cursor: any[]
  cursor_id: string
}

type dbExpr = faunadb.Expr




