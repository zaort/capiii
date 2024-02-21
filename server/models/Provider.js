import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const providerSchema = new Schema(
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
		createdPlans: [],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

providerSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

providerSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

providerSchema.virtual("planCount").get(function () {
	return this.plans.length;
});

const Provider = model("Provider", providerSchema);

export default Provider;
