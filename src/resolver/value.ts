// * "global" values: const, enums

export {
  indexingFieldValue,
}

/**
each doc has field named "_" used only for indexing
(so that all indexes have 1 partition)
 */
// TODO field key also needed, so we need an object{}
// ? use Object.freeze() or readonly pattern 
// ? (quick check: performance; and other caveats)
// TODO write const's name in ALL CAPS
const indexingFieldValue = 0



