
// this file is a reminder of how I was able to stitch 
// custom generated directives to a (non-generated) schema
// ? https://www.graphql-tools.com/docs/schema-directives


// * directiveFile.ts

function upperDirective(directiveName: string) {
  return {
    
    upperDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    
    upperDirectiveTransformer: (schema: GraphQLSchema) => mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directives = getDirectives(schema, fieldConfig);
        
        if (directives[directiveName]) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          
          fieldConfig.resolve = async function (source: any, args: any, context: any, info: any) {
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



// * (usually in) server.ts/app.ts
// imports necessary to work w/ schema directives

import { mapSchema, getDirectives } from "@graphql-tools/utils";
import { loadFiles, makeExecutableSchema, MapperKind } from "graphql-tools";
import { defaultFieldResolver } from "graphql/execution/execute";
import { GraphQLSchema } from "graphql/type/schema";


// * before db connection
// when initializing the graphQL layer itself

const { 
	upperDirectiveTypeDefs, 
	upperDirectiveTransformer 
} = upperDirective('upper');

// ! what follows was the difficult part
// because I had to piece the info needed to do this part
// together looking at more GraphQL documentations
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



// * typeDefFile.graphql

type Event {
	_id: ObjectID!
	creator: User!
	date: DateTime
	description: NonEmptyString
	price: Currency
	title: NonEmptyString! @upper
}


