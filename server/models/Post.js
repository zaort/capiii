import { Schema, model } from "mongoose";

const postSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		provider: {
			type: Schema.Types.ObjectId,
			ref: "Provider",
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

export default Post;
