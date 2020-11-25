import express, { Application, json } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { Event } from "./model/event";
import { User } from "./model/user";
import { REGEX, ResponseId } from "./util";


(async function() {
  const app: Application = express();
  
  // * middleware

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
        
        type User {
          _id: ID!
          # ? make it:  [Event!]!
          createdEvents: [Event!]
          email: String!
          # password: String
        }
        
        
        input EventInput {
          date: Int!
          description: String
          price: Float!
          title: String!
        }
        
        input UserInput {
          email: String!
          password: String!
        }
        
        
        type RootQuery {
          events: [Event!]!
        }
        
        type RootMutation {
          createEvent(eventInput: EventInput): Event
          createUser(userInput: UserInput): User
        }
        
        
        schema {
          query: RootQuery
          mutation: RootMutation
        }
      `),
      
      rootValue: {
        
        createEvent: async (args: any) => {
          // ! what if "await User..." fails
          // ? what's the official way of doing this
          
          try {
            // const doc: Document = 
            //   await new Event(args.eventInput).save();
            const doc: Document = 
              await new Event({ 
                ...args.eventInput,
                creator: "5fbea02ad01ddc2674d4be14",
              }).save();
            console.log("created doc", doc);
            
            
            const user: Document | null = 
              await User.findById("5fbea02ad01ddc2674d4be14");
            
            if (user) {
              // ? would typegoose fix this
              (user as any).createdEvents.push(doc._id);
              
              await user.save();
              
              return doc;
            } else {
              throw new Error("user-not-found");
            }
          } catch (e) {
            console.error(e)
            throw e;
            // apiError(e, res);
          }
        },
        
        createUser: async (args: any) => {
          const { userInput } = args;
          
          // ? should this check even be server side
          if (!(userInput.email).match(REGEX.EMAIL)) {
            throw new Error("invalid-email");
          }
          
          try {
            const user: Document | null = 
              await User.findOne({ email: userInput.email });
            
            if (user) {
              throw new Error(ResponseId.DocAlreadyExists);
            }
            
            const encrypted: string = 
              await bcrypt.hash(userInput.password, 12);
            
            const doc: Document = await new User({
              ...userInput,
              password: encrypted,
            }).save();
            console.log("created doc", doc);
            
            return doc;
          } catch (e) {
            console.error(e)
            throw e;
            // apiError(e, res);
          }
        },
        
        
        events: async () => {
          try {
            return await Event.find();
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
  
  
  try {
    // * db connection
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
    
    // * server start
    app.listen(process.env.PORT || 3000);
	} catch (e) {
    console.error(e);
  }
  
}());


