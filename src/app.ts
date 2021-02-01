import { graphqlHTTP } from "express-graphql";
import { loadFiles, makeExecutableSchema } from "graphql-tools";
import { prodLogging } from "./util";
import cors from "cors";
import express, { json } from "express";
import resolvers from "./resolver/resolver";


prodLogging()
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
  json(),
  // urlencoded({ extended: false }),
);

!async function() {
  try {
    app.use('/graphql', graphqlHTTP({
      // graphiql: { headerEditorEnabled: true },
      // rootValue,
      // pretty: true,
      schema: makeExecutableSchema({
        typeDefs: [
          ...await loadFiles(`${__dirname}/typeDef/*.graphql`),
        ],
        resolvers,
      }),
    }));
    
    // * db connection
    const { 
      DB_USER_USER, DB_USER_PSW, DB_NAME
    } = process.env;
    
		await mongoose.connect(
      `mongodb+srv://${DB_USER_USER}:${
        DB_USER_PSW}@cluster0.cqzbt.mongodb.net/${
        DB_NAME}?retryWrites=true&w=majority`,
			{ 
        useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
    );
    
    // * server start
    app.listen(4000);
	} catch (e) {
    console.error(e);
  }
}();


