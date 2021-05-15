// * junction(snodo) for custom graphql scalars 

export {
  CurrencyResolver as Currency,
  DateTimeResolver as DateTime,
  EmailAddressResolver as EmailAddress,
  JSONResolver as JSONScalar, // JSON collides w/ JS's
  // JSONObjectResolver as JSONObject,
  NonEmptyStringResolver as NonEmptyString,
  PositiveIntResolver as PositiveInt,
  TimestampResolver as Timestamp,
} from "graphql-scalars";
