/** @format */

import faunadb, { query as q } from "faunadb";
import { fieldsList, fieldsMap, fieldsProjection } from "graphql-fields-list";
// import { Event } from "../model/event";
// import { User } from "../model/user";

type Context = {
  client: faunadb.Client;
};
const {
  Abort,
  Add,
  Call,
  Collection,
  Collections,
  Contains,
  Create,
  Do,
  Documents,
  Exists,
  Get,
  Identity,
  If,
  Index,
  Join,
  Lambda,
  Let,
  Match,
  Not,
  Now,
  Paginate,
  Ref,
  Select,
  Subtract,
  ToArray,
  Update,
  Var,
} = q;

// resolver map
export default {
  Mutation: {
    createEvent: async (
      parent: any,
      args: any,
      ctx: Context,
      info: any
    ) => {
      const { jsonInput } = args;
      const { client } = ctx;

      client.query(
        Create(Collection("event"), {
          data: jsonInput,
        })
      ).then((res: any) => {
        console.log(res)
        return res.data
      });

      // if (!(await User.exists({ _id: eventInput.creator }))) {
      //   throw new Error("user-not-found");
      // }

      // return await new Event(eventInput).save();
    },

    createUser: async (parent: any, args: any, ctx: Context, info: any) => {
      const { input } = args;
      const { client } = ctx;
      
      const fieldMap: any = {};
      fieldsList(info, {
        path: "node",
      }).forEach((key: string) => {
        switch (key) {
          case "id":
            fieldMap[key] = ["ref", key]
            break;
          case "ts":
            fieldMap[key] = [key]
            break;
          default:
            fieldMap[key] = ["data", key]
        }
      });
      
      
      const MakeObject = (doc: any, fieldMap: any) => {
        // shallow copy (works w/out)
        // fieldMap = Object.assign({}, fieldMap)
        
        for (const key in fieldMap) {
          fieldMap[key] = Select(fieldMap[key], doc)
        }
        
        // console.log("MakeObject fieldMap", fieldMap)
        return fieldMap;
      }

      
      try {
        const res: any = await client.query(
          // Abort("aborted 4 test"),
          
          q.Map(
            input,
            // ["296051984256991751", "296051984256992775", "296051984256993799"],
            Lambda("docToCreate", 
              Let(
                {
                  createdDoc: Create(Collection("user"), {
                    data: Var("docToCreate")
                  }),
                  // createdDoc: Get(Ref(Collection("user"), Var("docToCreate"))),
                  docToReturn: MakeObject(Var("createdDoc"), fieldMap),
                },
                q.Var("docToReturn")
              )
            )
          )
          
        );
        
        // console.log("res", res)
        return {
          node: res,
        };
      } catch (e) {
        console.error("catch e", e)
        return { errorCode: e.description } // Abort("description")
      }
      
    },
  },
  Query: {
    listEvent: async (parent: any, args: any, ctx: Context, info: any) => {
      // return await Event.find().lean({ autopopulate: true });

      const { client } = ctx;

      const ret = await client.query(
        Paginate(Collections())
      );
      console.log("ret", ret);
      
      // return await client.query(Paginate(Collections()));
      return ret;
    },

    listUser: async (parent: any, args: any, ctx: Context, info: any) => {
      const { page } = args;
      const { client } = ctx;
      
      const fieldMap: any = fieldsMap(info, {
        path: "node",
      });
      const indexFields: string[] = ["ts", "id", "email", "name"];
      
      indexFields.forEach((key) => {
        if (fieldMap.hasOwnProperty(key)) {
          fieldMap[key] = Var(key);
        }
      });
      
      
      const ParseCursor = ({ 
        collectionName, cursor 
      }: { 
        collectionName: string, 
        cursor: any[], 
      }) => {
        console.log("ParseCursor()", cursor)
        if (cursor) {
          cursor[cursor.length - 1] = 
            Ref(Collection(collectionName), cursor[cursor.length - 1]);
          return cursor;
        }
      }
      
      
      try {
        const res: any = await client.query(
          // Abort("aborted 4 test"),
          
          Let(
            {
              mapResult: 
                q.Map(
                  Paginate(
                    Match(Index("user")),
                    { 
                      after: ParseCursor({ 
                        cursor: page.cursorAfter, 
                        collectionName: "user", 
                      }),
                      size: page.size, 
                    }
                  ),
                  Lambda(
                    indexFields,
                    fieldMap
                  )
                ),
              manipulatedResult: {
                data: Var("mapResult"),
                after: Select(
                  ["after", indexFields.length, "id"], 
                  Var("mapResult"), 
                  // TODO put inside a global variable
                  ""
                ),
              }
            },
            Var('manipulatedResult')
          )
          
        );
        
        // console.log("res", res)
        // console.log("res.data", res.data)
        return {
          page: {
            cursorAfter: res.after,
          },
          node: res.data.data,
        };
      } catch (e) {
        console.error("catch e", e)
        return { errorCode: e.description } // Abort("description")
      }
      
    },
  },
};
