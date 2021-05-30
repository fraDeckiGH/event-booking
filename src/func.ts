// * helper funcs

import { query as q } from "faunadb";
import ResponseT from "./typeDef/response";
import { CursorWrap, dbExpr } from "./typeTS";
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

// * cursor

/**
return a cursor (to send the client) packed conveniently 
for parsing in (a future) next pagination
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
  cursorWrap?: CursorWrap,
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
  // TODO test: fieldMap must not result dirty
  // Object.assign() triggers setters, whereas spread syntax doesn't
  fieldMap = {...fieldMap}
  // fieldMap = Object.assign({}, fieldMap)
  
  fieldMapKeys.forEach((key: string) => {
    fieldMap[key] = Select(fieldMap[key], doc)
  })
  
  // console.log("fieldMap", fieldMap)
  return fieldMap;
}

// * query

const packQueryError = function({
  error: e,
}: {
  error: any,
}): ResponseT {
  console.error("catch", e)
  return { 
    code: e.description, // Abort("description")
  }
}







