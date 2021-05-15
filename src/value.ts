// * "global" values: const, enums

export {
  INDEXING_FIELD,
  SELECT_DEFAULT_VALUE,
}

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




