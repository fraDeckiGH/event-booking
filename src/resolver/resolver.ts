/** @format */

import faunadb, { query as q } from "faunadb";
import { fieldsList, fieldsMap, fieldsProjection } from "graphql-fields-list";
import { packCursor, packDocument, packQueryError, parseCursor } from "./func";
import { Context } from "./type";
import { INDEXING_FIELD, SELECT_DEFAULT_VALUE } from "./value";
// import { Event } from "../model/event";
// import { User } from "../model/user";

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
      const { db } = ctx;

      db.query(
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
      const { db } = ctx;
      
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
      
      
      // TODO add indexing field ("_")
      try {
        const res: any = await db.query(
          // Abort("aborted 4 test"),
          
          q.Map(
            // input,
            ["296142445081526789", "296142424389976581", "296127950624916997"],
            Lambda("docToCreate", 
              Let(
                {
                  // createdDoc: Create(Collection("user"), {
                  //   data: Var("docToCreate")
                  // }),
                  createdDoc: Get(Ref(Collection("user"), Var("docToCreate"))),
                  docToReturn: packDocument({
                    doc: Var("createdDoc"), 
                    fieldMap,
                  }),
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
        return packQueryError({
          error: e,
        })
      }
      
    },
  },
  Query: {
    listEvent: async (parent: any, args: any, ctx: Context, info: any) => {
      // return await Event.find().lean({ autopopulate: true });

      const { db } = ctx;

      const ret = await db.query(
        Paginate(Collections())
      );
      console.log("ret", ret);
      
      // return await db.query(Paginate(Collections()));
      return ret;
    },

    listUser: async (parent: any, args: any, ctx: Context, info: any) => {
      const { page } = args;
      const { db } = ctx;
      
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
      
      
      try {
        const res: any = await db.query(
          // Abort("aborted 4 test"),
          
          Let(
            {
              page: q.Map(
                Paginate(
                  Match(Index(indexName), INDEXING_FIELD.value),
                  { 
                    after: parseCursor({ 
                      cursorWrap: page.cursorAfter, 
                      collectionName, 
                    }),
                    size: page.size, 
                  }
                ),
                Lambda(
                  indexFields,
                  fieldMap
                )
              ),
              page_after: Select("after", Var("page"), SELECT_DEFAULT_VALUE),
              pageRepack: {
                data: Select("data", Var("page")),
                after: packCursor({
                  cursor: Var("page_after"),
                  indexFields_length: indexFields.length,
                }),
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
        return packQueryError({
          error: e,
        })
      }
      
    },
  },
};
