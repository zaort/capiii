const { User, Plan, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/authentication.js");
const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
				return userData;
			}
			return null;
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			try {
				const user = await User.findOne({ email });

				if (!user) {
					throw AuthenticationError;
				}

				const correctPassword = await user.isCorrectPassword(password);

				console.log(user);
				if (!correctPassword) {
					throw AuthenticationError;
				}
				const token = signToken(user);
				console.log(token);
				return { token, user };
			} catch (err) {
				console.log(err);
				return err;
			}
		},
		createUser: async (parent, { username, email, password, isProvider }) => {
			try {
				isProvider = isProvider ? isProvider : false;

				const user = await User.create({ username, email, password, isProvider });
				const token = signToken(user);

				return { token, user };
			} catch (err) {
				console.log(err);
			}
		},
		createPlan: async (parent, { planData: { name, description, price } }, context) => {
			try {
				console.log("context.user", context.user);
				if (!context.user) {
					throw new Error("No authenticated user");
				}

				const user = await User.findById(context.user._id);

				if (!user.isProvider) {
					throw new Error("Users cannot create plans.");
				}

				const plan = await Plan.create({ name, description, price, provider: context.user._id });
				return plan;
			} catch (err) {
				console.log(err);
			}
		},
		createPost: async (parent, { postData: { description, provider, plan } }) => {
			try {
				const post = await Post.create({ description, provider, plan });
				return post;
			} catch (err) {
				console.log(err);
			}
		},
		subscribePlan: async (parent, { planData }, context) => {
			// console.log("context.user -----", context.user);
			// console.log("planData ------", planData);

			if (context.user) {
				const user = await User.findById(context.user._id);
				// console.log("user -----", user);

				if (user.isProvider) {
					throw new Error("Providers cannot subscribe or unsubscribe to plans");
				}

				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { subscribedPlans: planData.planId } },
					{ new: true }
				).populate("subscribedPlans");
				// console.log("updatedUser -------", updatedUser);

				const updatedPlan = await Plan.findOneAndUpdate(
					{ _id: planData.planId },
					{ $addToSet: { subscribers: context.user._id } },
					{ new: true }
				);
				// console.log("updatedPlan -------", updatedPlan);

				return updatedUser;
			} else {
				console.log("No authenticated user");
			}
		},
		unsubscribePlan: async (parent, { planId }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);
				if (user.isProvider) {
					throw new Error("Providers cannot subscribe or unsubscribe to plans");
				}
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { subscribedPlans: planId } },
					{ new: true }
				).populate("subscribedPlans");
				const updatedPlan = await Plan.findOneAndUpdate(
					{ _id: planId },
					{ $pull: { subscribers: context.user._id } },
					{ new: true }
				);
				return updatedUser;
			}
		},
		removePlan: async (parent, { planId }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);

				if (!user.isProvider) {
					throw new Error("Users cannot delete plans plans.");
				}
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { createdPlans: planId } },
					{ new: true }
				).populate("createdPlans");
				return updatedUser;
			}
		},
	},
};
module.exports = resolvers;
