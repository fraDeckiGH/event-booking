/** @format */

import faunadb, { query as q } from "faunadb";
// import { Response } from "express";

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


/* export const REGEX = Object.freeze({
  EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
}); */

export enum ModelName {
  Event = "Event",
  User = "User",
}

export enum ResponseId {
  DocAlreadyExists = "doc-already-exists",
  DocCreated = "doc-created",
  DocDeleted = "doc-deleted",
  DocNotFound = "doc-not-found",
  DocRetrieved = "doc-retrieved",
  DocsRetrieved = "docs-retrieved",
  DocUpdated = "doc-updated",
  Unauthorized = "unauthorized",
}

export enum SchemaTypeOpt {
  MaxDate = 4102444800000, // 2100
  MaxPrice = 999999,
}

export type Maybe<T> = T/*  | null */ | undefined;

/**
 * path's value "falsy"? db won't store the path
 * not needed on 'required' fields
 * @param val
 */
export function noFalsy<T>(val: T) {
  return val || undefined;
}

export function prodLogging() {
  if (process.env.NODE_ENV === "production") {
    // console.error = () => {}
    console.log = () => {};

    // reminder: there are others
  }
}

/* export function apiError(err: any, res: Response) {
	console.error(err);
	
	res.status(500).json({
		error: err
	});
} */

/* export function makeString<T>(val: T) {
	return val + "";
} */

/* export function sortSchemaKeys(ret: any) {
	let newObj: any = {};
	
	Object.keys(ret)
		.sort()
		.forEach((key: string) => {
			newObj[key] = ret[key];
		});
	
	return newObj;
} */




function ParseCursor({ 
  collectionName, cursorWrap/* , query: q */
}: { 
  collectionName: string, 
  cursorWrap: {
    cursor: any[],
    cursor_id: string,
  }, 
  // query?: faunadb.Expr,
}) {
  console.log("ParseCursor()", cursorWrap)
  if (cursorWrap) {
    const { cursor, cursor_id } = cursorWrap;
    cursor[cursor.length - 1] = 
      Ref(Collection(collectionName), cursor_id);
    return cursor;
  }
}


export {
  ParseCursor,
}