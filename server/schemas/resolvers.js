const { User, Plan, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/authentication.js");
const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			try {
				if (context.user) {
					const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
					return userData;
				}
				return null;
			} catch (e) {
				console.log(e);
			}
		},
		posts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Post.find(params).sort({ createdAt: -1 });
		},
		post: async (parent, { postID }) => {
			return Post.findOne({ postID });
		},
		plans: async () => {
			return Plan.find({}).sort({ createdAt: -1 });
		},
		plan: async (parent, { planId }) => {
			return Plan.findOne({ _id: planId });
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

				// console.log(user);
				if (!correctPassword) {
					throw AuthenticationError;
				}
				const token = signToken(user);
				// console.log(token); // token used for testing
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
				if (!context.user) {
					throw new Error("No authenticated user");
				}

				const user = await User.findById(context.user._id);

				if (!user.isProvider) {
					throw new Error("Users cannot create plans.");
				}

				const plan = await Plan.create({ name, description, price, provider: context.user._id });

				await User.findByIdAndUpdate(context.user._id, { $push: { createdPlans: plan._id } });
				return plan;
			} catch (err) {
				console.log(err);
			}
		},
		createPost: async (parent, { postData: { description, plan } }, context) => {
			try {
				if (!context.user) {
					throw new Error("No authenticated user");
				}

				const user = await User.findById(context.user._id);

				if (!user.isProvider) {
					throw new Error("Only providers can create posts.");
				}

				const planData = await Plan.findById(plan);

				if (!planData || String(planData.provider) !== String(user._id)) {
					throw new Error("You can only create posts for plans you created.");
				}

				const post = await Post.create({ description, provider: user._id, plan });

				await Plan.findByIdAndUpdate(plan, { $push: { posts: post._id } });

				await User.findByIdAndUpdate(user, { $push: { postsCreated: post._id } });
				return post;
			} catch (err) {
				console.log(err);
			}
		},
		subscribePlan: async (parent, { planData }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);

				if (user.isProvider) {
					throw new Error("Providers cannot subscribe or unsubscribe to plans");
				}

				const plan = await Plan.findById(planData.planId);

				if (!plan) {
					throw new Error(`Plan with ID ${planData.planId} not found`);
				}

				if (user.subscribedPlans.includes(planData.planId)) {
					throw new Error("User is already subscribed to this plan");
				}

				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { subscribedPlans: planData.planId } },
					{ new: true }
				).populate("subscribedPlans");

				const updatedPlan = await Plan.findOneAndUpdate(
					{ _id: planData.planId },
					{ $addToSet: { subscribers: context.user._id } },
					{ new: true }
				);

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

				if (!user.subscribedPlans.includes(planId)) {
					throw new Error("User is not subscribed to this plan");
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
					throw new Error("Users cannot delete plans.");
				}

				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { createdPlans: planId } },
					{ new: true }
				).populate("createdPlans");

				await Plan.findByIdAndDelete(planId);

				return updatedUser;
			}
		},
	},
};
module.exports = resolvers;
