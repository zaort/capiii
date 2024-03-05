const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must match an email address!"],
		},
		isProvider: {
			type: Boolean,
			default: false,
		},
		subscribedPlans: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
		createdPlans: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
		postsCreated: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.virtual("planCount").get(function () {
	return this.createdPlans.length || 0;
});

const User = model("User", userSchema);

module.exports = User;
