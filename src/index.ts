import "reflect-metadata";
import fastify from "fastify";
import fastifyCors from "fastify-cors";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import { prodSetup } from "./util";

prodSetup()
const app = fastify({
  // #region logger
  // https://www.fastify.io/docs/latest/Logging/
  /* logger: {
    // https://github.com/pinojs/pino/blob/master/docs/api.md#loggerlevel-string-gettersetter
    level: "error",
  }, */
  // #endregion
})

// * middleware

app.register(fastifyCors)

!async function() {
  try {
    app.register(mercurius, {
      
      // context,
      jit: 1, // ? is 1 ok?
      // rootValue,
      schema: await buildSchema({
        emitSchemaFile: {
          commentDescriptions: true,
          path: "gen/schema.gql",
          // by default the printed schema is sorted alphabetically
          // sortedSchema: false,
        },
        // orphanedTypes: [ PersonResolver ],
        resolvers: [`${__dirname}/resolver/*.{js,ts}`],
      }),
      
    });
    
    // * server start
    app.listen(4000)
  } catch (e) {
    console.error(e)
  }
}()
