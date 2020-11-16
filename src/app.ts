import express, { Application, json } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";


const app: Application = express();
export default app;



// =======================================================================
// * db connection: connecting this app to MongoDB Atlas's cluster
// option chosen: mongoDB's native drivers

(async function() {
	try {
		await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_USER}:${
        process.env.DB_USER_PSW}@${
        process.env.DB_NAME}.cqzbt.mongodb.net/${
        process.env.DB_NAME}?retryWrites=true&w=majority`,
			{ 
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		// console.log("DB connected to the server");
	} catch (e) {
		console.error(e);
	}
}());



// =======================================================================
// middleware (only belong before the routes)

// bodyParser
// what we'll be able to find in APIs' req.body
app.use(
	json(),
	// urlencoded({ extended: false }),
);

const events: any[] = [];
// graphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      
      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      
      
			type RootQuery {
				events: [Event!]!
			}
			
			type RootMutation {
				createEvent(eventInput: EventInput): Event
			}
			
			schema {
				query: RootQuery
				mutation: RootMutation
			}
    `),
    
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args: any) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    
    graphiql: true
  })
);









