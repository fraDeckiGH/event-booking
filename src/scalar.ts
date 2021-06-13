
export {
  CurrencyResolver as Currency,
  DateTimeResolver as DateTime,
  EmailAddressResolver as EmailAddress,
  JSONResolver as JSONScalar, // JSON collides w/ TS'
  // JSONObjectResolver as JSONObject,
  NonEmptyStringResolver as NonEmptyString,
  PositiveIntResolver as PositiveInt,
  TimestampResolver as Timestamp,
} from "graphql-scalars"
