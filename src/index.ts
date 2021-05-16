import cors from "cors";
import express, { json } from "express";
import { graphqlHTTP } from "express-graphql";
import faunadb /* , { query as q } */ from "faunadb";
import "reflect-metadata"; // must be before any "type-graphql" import in the app
import { buildSchema } from "type-graphql";
import { prodLogging } from "./util";

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

!async function() {
  try {
    app.use(
      "/graphql",
      graphqlHTTP({
        
        context: {
          // * db connection
          db: new faunadb.Client({
            secret: process.env.FAUNADB_SERVER_SECRET!,
          }),
        },
        // rootValue,
        schema: await buildSchema({
          emitSchemaFile: {
            commentDescriptions: true,
            path: "gen/schema.gql",
            // by default the printed schema is sorted alphabetically
            // sortedSchema: false,
          },
          // orphanedTypes: [ UserInput ],
          resolvers: [`${__dirname}/resolver/*.{js,ts}`],
        }),
        
      })
    );

    // * server start
    app.listen(4000);
  } catch (e) {
    console.error(e);
  }
}();
