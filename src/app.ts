import express, { Application, json } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose, { Document } from "mongoose";
import { Event } from "./model/event";
import { User } from "./model/user";
import { IDocument } from "./util";


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
          creator: User!
          date: Float
          description: String
          price: Float
          title: String!
        }
        
        type User {
          _id: ID!
          createdEvents: [Event!]
          email: String!
        }
        
        
        input EventInput {
          date: String
          description: String
          price: Float
          title: String!
        }
        
        input UserInput {
          email: String!
          password: String!
        }
        
        
        type RootQuery {
          events: [Event!]!
          users: [User!]!
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
          // ? use 'exists()' instead
          const user: Document | null = 
            await User.findById("5fdf80aeea5d943ddc4f5db8");
          
          if (!user) {
            throw new Error("user-not-found");
          }
          
          const doc: Document = new Event({ 
            ...args.eventInput,
            creator: "5fdf80aeea5d943ddc4f5db8",
          });
          
          // console.log("created doc", doc);
          return await doc.save();
        },
        
        
        createUser: async (args: any) => {
          const doc: IDocument = 
            await new User(args.userInput).save()
          // console.log(await bcrypt.compare("plainPsw", doc.password))
          
          return doc;
        },
        
        
        events: async () => {
          return (
            await Event.find()
              .lean({ autopopulate: true })
          );
        },
        
        users: async () => {
          const docs = await User.find()
            .lean()
            .populate("createdEvents")
          
          // console.log(docs);
          return docs;
        },
        
      },
      
      graphiql: true,
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


