/** @format */

import faunadb, { query as q } from "faunadb";
// import { Event } from "../model/event";
// import { User } from "../model/user";

type Context = {
  client: faunadb.Client;
};
const {
  Call,
  Create,
  Collection,
  Collections,
  Identity,
  Paginate,
  Documents,
  Lambda,
  Get,
  Var,
  Select,
  Let,
  Match,
  Index,
  Join,
  If,
  Exists,
  Update,
  Do,
  Add,
  Subtract,
  Not,
  Contains,
  Abort,
  Now,
} = q;

export default {
  Mutation: {
    createEvent: async (
      parent: any,
      args: any,
      context: Context,
      info: any
    ) => {
      const { eventInput } = args;
      const { client } = context;

      return await client
        .query(
          Create(Collection("event"), {
            data: eventInput,
          })
        )
        .then((res: any) => {
					// console.log(res)
					return res.data
				});

      // if (!(await User.exists({ _id: eventInput.creator }))) {
      //   throw new Error("user-not-found");
      // }

      // return await new Event(eventInput).save();
    },

    createUser: async (parent: any, args: any, context: Context, info: any) => {
      // const doc = await new User(args.userInput).save();
      // console.log(await bcrypt.compare("plainPsw", doc.password))
      // return doc;
    },
  },
  Query: {
    events: async (parent: any, args: any, context: Context, info: any) => {
      // return await Event.find().lean({ autopopulate: true });

      const { client } = context;

      const ret = await client.query(Paginate(Collections()));
      console.log("ret", ret);

      // return await client.query(Paginate(Collections()));
      return ret;
    },

    users: async (parent: any, args: any, context: Context, info: any) => {
      // const docs = await User.find().lean().populate("createdEvents");
      // // console.log(docs);
      // return docs;
    },
  },
};
