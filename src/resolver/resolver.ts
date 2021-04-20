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
      
      const collectionName = "user";
      const indexName = "user";
      
      const fieldMap: any = fieldsMap(info, {
        path: "node",
      });
      const indexFields: string[] = ["ts", "id", "email", "name"];
      
      indexFields.forEach((key) => {
        if (fieldMap.hasOwnProperty(key)) {
          fieldMap[key] = Var(key);
        }
      });
      
      
      // ! ERO QUI, FINIRE DI TESTARE
      const ParseCursor = ({ 
        collectionName, cursorWrap
      }: { 
        collectionName: string, 
        cursorWrap: {
          cursor: any[],
          cursor_id: string,
        }, 
      }) => {
        console.log("ParseCursor()", cursorWrap)
        const { cursor, cursor_id } = cursorWrap;
        if (cursorWrap) {
          cursor[cursor.length - 1] = 
            Ref(Collection(collectionName), cursor_id);
          return cursor;
        }
      }
      
      
      try {
        const res: any = await client.query(
          // Abort("aborted 4 test"),
          
          Let(
            {
              page: q.Map(
                Paginate(
                  Match(Index(indexName), 0),
                  { 
                    after: ParseCursor({ 
                      cursorWrap: page.cursorAfter, 
                      collectionName: collectionName, 
                    }),
                    size: page.size, 
                  }
                ),
                Lambda(
                  indexFields,
                  fieldMap
                )
              ),
              page_after: Select("after", Var("page"), ""),
              pageRepack: {
                data: Select("data", Var("page")),
                after: {
                  cursor: Var("page_after"),
                  cursor_id: Select(
                    [indexFields.length, "id"], 
                    Var("page_after"), 
                    // TODO put inside a global variable
                    ""
                  ),
                },
              }
            },
            Var("pageRepack")
          )
          
        );
        
        console.log("res", res)
        // console.log("res.data", res.data)
        return {
          page: {
            cursorAfter: res.after,
          },
          node: res.data,
        };
      } catch (e) {
        console.error("catch e", e)
        return { errorCode: e.description } // Abort("description")
      }
      
    },
  },
};
