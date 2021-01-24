import express, { json } from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import resolvers from "./resolver/resolver";
import cors from "cors";

import { mapSchema, getDirectives } from "@graphql-tools/utils";
import { loadFiles, makeExecutableSchema, MapperKind } from "graphql-tools";
import { defaultFieldResolver } from "graphql/execution/execute";
import { GraphQLSchema } from "graphql/type/schema";


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

(async function() {
  try {
    const { 
      upperDirectiveTypeDefs, 
      upperDirectiveTransformer 
    } = upperDirective('upper');
    
    app.use('/graphql', graphqlHTTP({
      // graphiql: { headerEditorEnabled: true },
      // rootValue,
      // pretty: true,
      schema: makeExecutableSchema({
        typeDefs: [
          ...await loadFiles(`${__dirname}/typeDef/*.graphql`),
          upperDirectiveTypeDefs,
        ],
        resolvers,
        schemaTransforms: [
          upperDirectiveTransformer
        ],
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
}());


function upperDirective(directiveName: string) {
  return {
    
    upperDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    
    upperDirectiveTransformer: (schema: GraphQLSchema) => mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directives = getDirectives(schema, fieldConfig);
        
        if (directives[directiveName]) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          
          fieldConfig.resolve = async (source: any, args: any, context: any, info: any) => {
            const result = await resolve(source, args, context, info);
            
            if (typeof result === 'string') {
              return result.toUpperCase();
            }
            
            return result;
          }
          
          return fieldConfig;
        }
      }
    }),
    
  };
}




