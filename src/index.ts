import "reflect-metadata";
import cors from "cors";
import fastify from "fastify";
import fastifyCors from "fastify-cors";
import express, { json } from "express";
import mercurius from "mercurius";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { prodLogging } from "./util";

prodLogging()
// const app = express()

// * middleware

// app.use(
//   // TODO explore pkg and its need/usage 
//   // https://github.com/expressjs/compression
//   // compress all responses
//   // compression(),

//   // Apollo Studio
//   cors(),

//   // bodyParser
//   json()
//   // urlencoded({ extended: false }),
// )

// !async function() {
//   try {
//     app.use(
//       "/graphql",
//       graphqlHTTP({
        
//         // context,
//         // rootValue,
//         schema: await buildSchema({
//           emitSchemaFile: {
//             commentDescriptions: true,
//             path: "gen/schema.gql",
//             // by default the printed schema is sorted alphabetically
//             // sortedSchema: false,
//           },
//           // orphanedTypes: [ PersonResolver ],
//           resolvers: [`${__dirname}/resolver/*.{js,ts}`],
//         }),
        
//       })
//     );

//     // * server start
//     app.listen(4000);
//   } catch (e) {
//     console.error(e);
//   }
// }()






const app = fastify()

app.register(fastifyCors)

!async function() {
  try {
    app.register(mercurius, {
      
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
      jit: 1, // ? is 1 ok?
      
    });
    
    // * server start
    app.listen(4000)
  } catch (e) {
    console.error(e)
  }
}()















