import { Event } from "../model/event";
import { User } from "../model/user";


export default {
	Mutation: {
		
		createEvent: async (
			parent: any, args: any, context: any, info: any
		) => {
			const { eventInput } = args
			
			if (!await User.exists({ _id: eventInput.creator })) {
				throw new Error("user-not-found");
			}
			
			return await new Event(eventInput).save();
		},
		
		createUser: async (
			parent: any, args: any, context: any, info: any
		) => {
			const doc = await new User(args.userInput).save()
			// console.log(await bcrypt.compare("plainPsw", doc.password))
			
			return doc;
		},
		
	},
	Query: {
		
		events: async (
			parent: any, args: any, context: any, info: any
		) => {
			return (
				await Event.find()
					.lean({ autopopulate: true })
			);
		},
		
		users: async (
			parent: any, args: any, context: any, info: any
		) => {
			const docs = await User.find()
				.lean()
				.populate("createdEvents")
			
			// console.log(docs);
			return docs;
		},
		
	},
};



