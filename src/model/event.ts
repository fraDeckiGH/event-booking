import mongooseAutopopulate from "mongoose-autopopulate";
import { model, Schema, Types } from "mongoose";
import { ModelName, noFalsy, SchemaTypeOpt } from "../util";


const schema = new Schema({
	creator: {
		// populate w/ "ref"'s fields
		autopopulate: true,
		ref: ModelName.User,
		required: true,
		type: Types.ObjectId,
	},
	
	date: {
		max: SchemaTypeOpt.MaxDate,
		set: noFalsy,
		trim: true,
		type: Date,
	},
	
	description: {
		maxlength: 1000,
		set: noFalsy,
		trim: true,
		type: String,
	},
	
	price: {
		// min: 0,
		max: SchemaTypeOpt.MaxPrice,
		set: noFalsy,
		type: Number,
	},
	
	title: {
		maxlength: 100,
		required: true,
		trim: true,
		type: String,
	},
	
}, {
	id: false,
	typePojoToMixed: false, 
})
	.plugin(mongooseAutopopulate)
	
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	.set('toJSON', {
		// transform: (undefined, ret) => sortSchemaKeys(ret),
		// useProjection: true,
		versionKey: false,
		// virtuals: true,
	})

	// options to apply when this schema is applied to Object
	// e.g console.log
	.set('toObject', {
		// transform: (undefined, ret) => sortSchemaKeys(ret),
		// useProjection: true,
		versionKey: false,
		// virtuals: true,
	});



export const Event = model(ModelName.Event, schema);







