import express, { Application, json } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


const app: Application = express();
export default app;


// =======================================================================
// middleware (only belong before the routes)

// bodyParser
// what we'll be able to find in APIs' req.body
app.use(
	json(),
	// urlencoded({ extended: false }),
);


app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
			type RootQuery {
				events: [String!]!
			}
			
			type RootMutation {
				createEvent(name: String): String
			}
			
			schema {
				query: RootQuery
				mutation: RootMutation
			}
    `),
    rootValue: {
      events: () => {
        return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
      },
      createEvent: (args: any) => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);










