import { User, Plan, Post } from "../models/index.js";
import auth from "../utils/authentication.js";
const { signToken, AuthenticationError } = auth;
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

				const correctPw = await user.isCorrectPassword(password);

				if (!correctPw) {
					throw AuthenticationError;
				}
				const token = signToken(user);
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
		createPlan: async (parent, { planData: { name, description, price, provider } }) => {
			try {
				const user = await User.findById(provider);
				if (!user.isProvider) {
					throw new Error("Users cannot create plans plans.");
				}
				const plan = await Plan.create({ name, description, price, provider });
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
		subscribePlan: async (parent, { planId }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);
				if (user.isProvider) {
					throw new Error("Providers cannot subscribe or unsubscribe to plans");
				}
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { subscribedPlans: planId } },
					{ new: true }
				).populate("subscribedPlans");

				return updatedUser;
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
export default resolvers;
