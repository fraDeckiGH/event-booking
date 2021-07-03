// * "global" values: const, enums

import faunadb from "faunadb"

export { 
  DB,
  INDEXING_FIELD,
  SELECT_DEFAULT_VALUE,
}

const DB = new faunadb.Client({
  // keepAlive: false,
  secret: process.env.FAUNADB_SERVER_SECRET!,
})

/**
each doc has field named "_" used only for indexing
(so that all indexes have 1 partition)
 */
const INDEXING_FIELD = {
  key: "_",
  value: 0,
} as const

// ? useful
const SELECT_DEFAULT_VALUE = ""




