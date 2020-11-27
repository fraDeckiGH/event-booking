import express, { Application, json, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { Event } from "./model/event";
import { User } from "./model/user";
import { IDocument, REGEX, ResponseId } from "./util";


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
          // ? what's the official way of doing this
          try {
            const user: IDocument | null = 
              await User.findById("5fc1421dfabc2b20243b8354");
            
            if (!user) {
              throw new Error("user-not-found");
            }
            
            const doc: Document = new Event({ 
              ...args.eventInput,
              creator: "5fc1421dfabc2b20243b8354",
            });
            user.createdEvents.push(doc._id);
            
            
            // const promise1 = Promise.reject("rejection of mine");
            const promise3 = new Promise((resolve, reject) => {
              setTimeout(reject, 1000, new Error('foo'));
            });
            await Promise.all([
              promise3,
              user.save(),
              doc.save(),
            ]);
            
            
            console.log("created doc", doc);
            return doc;
            
          } catch (e) {
            console.error(e)
            throw e;
            // apiError(e, res);
          }
        },
        
        
        createUser: async (args: any) => {
          const { email, password } = args.userInput;
          
          // ? should this check even be server side
          if (!(email).match(REGEX.EMAIL)) {
            throw new Error("invalid-email");
          }
          
          try {
            const user: Document | null = 
              await User.findOne({ email: email });
            
            if (user) {
              throw new Error(ResponseId.DocAlreadyExists);
            }
            
            const encrypted: string = 
              await bcrypt.hash(password, 12);
            
            const doc: Document = await new User({
              ...args.userInput,
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


