// import { REGEX } from "../util";
// import mongooseAutopopulate from "mongoose-autopopulate";
import { Document, model, Schema, Types } from "mongoose";
import { ModelName } from "../util";


/* export interface IUser extends Document {
  [key: string]: any;
} */



const schema = new Schema({
	creator: {
		// populate w/ "ref"'s fields
		// autopopulate: true,
		ref: ModelName.User,
		required: true,
		type: Types.ObjectId,
	},
	
	date: {
		required: true,
		type: Number,
	},
	
	description: {
		// required: true,
		type: String,
	},
	
	price: {
		required: true,
		type: Number,
	},
	
	title: {
		required: true,
		type: String,
    // unique: true,
	},
	
	
	// *Order
	
	// product: {
	// 	autopopulate: true,
	// 	ref: 'Product',
	// 	required: true,
	// 	type: Types.ObjectId,
	// },
	
	// quantity: {
	// 	default: 1,
	// 	type: Number,
	// },
	
	
	// *Product
	
	// img: {
	// 	type: String,
	// },
	
	
	// *User
	
	// email: { 
	// 	match: REGEX.EMAIL,
	// 	required: true, 
	// 	type: String, 
	// 	unique: true, 
	// },
	
	// password: { 
	// 	required: true, 
	// 	type: String, 
	// },
})
	// .plugin(mongooseAutopopulate)
	
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	// .set('toJSON', {
	// 	// transform: (undefined, ret) => sortSchemaKeys(ret),
	// 	// useProjection: true,
	// 	versionKey: false
	// })

	// options to apply when this schema is applied to Object
	// e.g console.log
	// .set('toObject', {
	// 	// transform: (undefined, ret) => sortSchemaKeys(ret),
	// 	// useProjection: true,
	// 	versionKey: false
	// });



export const Event = model/* <IUser> */(ModelName.Event, schema);


