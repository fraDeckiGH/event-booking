// * helper funcs

import faunadb, { query as q } from "faunadb";
import { CursorWrap, dbExpr } from "./type";

const {
  Abort,
  Add,
  Call,
  Collection,
  Collections,
  Contains,
  Create,
  Do,
  Documents,
  Exists,
  Get,
  Identity,
  If,
  Index,
  Join,
  Lambda,
  Let,
  Match,
  Not,
  Now,
  Paginate,
  Ref,
  Select,
  Subtract,
  ToArray,
  Update,
  Var,
} = q;

export {
  packCursor,
  parseCursor,
}

// * cursor

/**
return a cursor (to send the client) packed conveniently 
for being parsed in (a future) next pagination
 */
const packCursor = function({
  cursor, 
  indexFields_length,
}: {
  cursor: dbExpr,
  indexFields_length: number,
}) {
  return If(
    // if (condition)
    !!cursor, // ! LAST CHECKPOINT
    // then
    {
      cursor,
      cursor_id: Select(
        [indexFields_length, "id"], 
        cursor, 
        // TODO put: ""  inside a global variable
        ""
      ),
    },
    // else
    null
  )
}

/**
return a cursor usable by the pagination from the one sent 
by the client
 */
const parseCursor = function({ 
  collectionName, 
  cursorWrap, 
}: { 
  collectionName: string, 
  // cursorWrap: {
  //   cursor: any[],
  //   cursor_id: string,
  // },
  cursorWrap: CursorWrap, 
}) {
  // console.log("parseCursor()", cursorWrap)
  if (cursorWrap) {
    const { cursor, cursor_id } = cursorWrap;
    cursor[cursor.length - 1] = 
      Ref(Collection(collectionName), cursor_id);
    return cursor;
  }
}










