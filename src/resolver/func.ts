// * helper funcs

import /* faunadb,  */{ query as q } from "faunadb";
import { CursorWrap, dbExpr } from "./type";
import { SELECT_DEFAULT_VALUE } from "./value";

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
  IsArray,
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
  packDocument,
  packQueryError,
  parseCursor,
}

// * {pinned} misc

const packQueryError = function({
  error: e,
}: {
  error: any,
}) {
  console.error("catch", e)
  // TODO create type for obj returned
  return { 
    errorCode: e.description, // Abort("description")
  }
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
    IsArray(cursor),
    // then
    {
      cursor,
      cursor_id: Select(
        [indexFields_length, "id"], 
        cursor, 
        SELECT_DEFAULT_VALUE
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

// * document

/**
return an obj to send the client from a db doc
 */
// TODO unfinished work
const packDocument = function({
  doc, 
  fieldMap,
  fieldMapKeys,
}: {
  doc: any, 
  fieldMap: any,
  fieldMapKeys: string[],
}) {
  // shallow copy (works w/out - due to transaction - 
  // dirty var after transaction ofc)
  fieldMap = Object.assign({}, fieldMap)
  
  // ! last checkpoint
  fieldMapKeys.forEach((key: string) => {
    fieldMap[key] = Select(fieldMap[key], doc)
  });
  // for (const key in fieldMap) {
  //   fieldMap[key] = Select(fieldMap[key], doc)
  // }
  
  // console.log("fieldMap", fieldMap)
  return fieldMap;
}









