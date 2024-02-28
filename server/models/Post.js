const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		provider: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		plan: {
			type: Schema.Types.ObjectId,
			ref: "Plan",
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Post = model("Post", postSchema);

module.exports = Post;
