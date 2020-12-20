import mongooseUniqueValidator from "mongoose-unique-validator";
import isEmail from 'validator/lib/isEmail';
import bcrypt from "bcrypt";
import { IDocument, ModelName } from "../util";
import { model, Schema } from "mongoose";


const schema = new Schema({
	
	email: {
		required: true,
		// in case we don't want 'required' anymore 
		// but still want 'unique'
		sparse: true,
		trim: true,
		type: String, 
		unique: true,
		uniqueCaseInsensitive: true,
		validate: (val: any) => {
			return isEmail(val);
		},
	},
	
	password: {
		maxlength: 20,
		minlength: 8,
		required: true,
		trim: true,
		type: String,
	},
	
}, {
	id: false,
	typePojoToMixed: false, 
})
	// .plugin(mongooseAutopopulate)
	// ? virtuals seem to work fine o.o
	// .plugin(mongooseLeanVirtuals)
	// * READ to make this plugin work on updates too
	// https://github.com/blakehaswell/mongoose-unique-validator#find--updates
	.plugin(mongooseUniqueValidator, 
		// { message: 'Error, expected {PATH} to be unique.' }
	)
	
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	.set('toJSON', {
		// transform: (undefined, ret) => sortSchemaKeys(ret),
		// useProjection: true,
		versionKey: false,
		virtuals: true,
	})

	// options to apply when this schema is applied to Object
	// e.g console.log
	.set('toObject', {
		// transform: (undefined, ret) => sortSchemaKeys(ret),
		// useProjection: true,
		versionKey: false,
		virtuals: true,
	})



schema.virtual("createdEvents", {
	ref: ModelName.Event,
	
	localField: "_id",
	foreignField: "creator",
	
	// count: true,
	
	// If `justOne` is true, 'createdEvents' will be a single doc 
	// as opposed to an array. `justOne` is false by default.
	// justOne: false,
	
	// Query options, see http://bit.ly/mongoose-query-options
	// options: { 
	// 	// limit: 2, 
	// 	sort: { title: 1, description: -1 }, 
	// },
	
})


async function hashPassword(this: IDocument) {
	// psw is being updated (or new)
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}
}


// TODO test "findOneAndUpdate"
// https://mongoosejs.com/docs/middleware.html#notes
schema.pre("findOneAndUpdate", hashPassword);
schema.pre("save", hashPassword);



export const User = model(ModelName.User, schema);




