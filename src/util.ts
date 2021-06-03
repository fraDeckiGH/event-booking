
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

export type Maybe<T> = T | undefined;

export function prodLogging() {
  if (process.env.NODE_ENV === "production") {
    // console.error = () => {}
    console.log = () => {}

    // reminder: there are others
  }
}

/* export function makeString<T>(val: T) {
	return val + "";
} */
