import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
		subscribedPlans: [],
		createdPlans: [],
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
	return this.plans.length;
});

const User = model("User", userSchema);

export default User;
