import express, { Application, json } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose, { Document } from "mongoose";
import { Event } from "./model/event";


const app: Application = express();
export default app;



// =======================================================================
// * db connection: connecting this app to MongoDB Atlas's cluster
// option chosen: mongoDB's native drivers

(async function() {
	try {
		await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_USER}:${
        process.env.DB_USER_PSW}@cluster0.cqzbt.mongodb.net/${
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

// graphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        date: Int!
        description: String
        price: Float!
        title: String!
      }
      
      input EventInput {
        date: Int!
        description: String
        price: Float!
        title: String!
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
      
      events: async () => {
        try {
          return await Event.find();
        } catch (e) {
          console.error(e)
          throw e;
          // apiError(e, res);
        }
      },
      
      createEvent: async (args: any) => {
        try {
          const doc: Document = 
            await new Event(args.eventInput).save();
          console.log("created doc", doc);
          
          return doc;
        } catch (e) {
          console.error(e)
          throw e;
          // apiError(e, res);
        }
      },
      
    },
    
    graphiql: true
  })
);









