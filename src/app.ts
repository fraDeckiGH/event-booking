/** @format */

import { graphqlHTTP } from "express-graphql";
import { loadFiles, makeExecutableSchema } from "graphql-tools";

import { Maybe, prodLogging } from "./util";
import cors from "cors";
import express, { json } from "express";
import resolvers from "./resolver/resolver";
import faunadb /* , { query as q } */ from "faunadb";

prodLogging();
const app = express();

// * middleware

app.use(
  // TODO explore pkg and its need/usage
  // https://github.com/expressjs/compression
  // compress all responses
  // compression(),

  // Apollo Studio
  cors(),

  // bodyParser
  json()
  // urlencoded({ extended: false }),
);

!(async function () {
  try {
    app.use(
      "/graphql",
      graphqlHTTP({
        context: {
          // * db connection
          db: new faunadb.Client({
            secret: <string>process.env.FAUNADB_SERVER_SECRET,
          }),
        },
        // graphiql: { headerEditorEnabled: true },
        // rootValue,
        // pretty: true,
        schema: makeExecutableSchema({
          typeDefs: [...(await loadFiles(`${__dirname}/typeDef/*.graphql`))],
          resolvers,
        }),
      })
    );

    // * server start
    app.listen(4000);
  } catch (e) {
    console.error(e);
  }
})();
