const { Schema, model } = require("mongoose");

const planSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		provider: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Plan = model("Plan", planSchema);
module.exports = Plan;
