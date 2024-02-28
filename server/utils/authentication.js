const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: __dirname + "/./../../.env" });
const expiration = "2h";

module.exports = {
	AuthenticationError: new GraphQLError("Server was unable to authenticate user.", {
		extensions: {
			code: "UNAUTHENTICATED",
		},
	}),
	authenticationMiddleware: function ({ req }) {
		let token = req.body.token || req.query.token || req.headers.authorization;
		const authHeader = req.headers.authorization;

		if (authHeader) {
			token = token.split(" ").pop().trim();
		}
		if (!token) {
			// console.log(`missing token for ${req.method} ${req.path}`);
			return req;
		}
		try {
			const { data } = jwt.verify(token, process.env.AUTH_SECRET, { maxAge: expiration });
			req.user = data;
			// console.log(data);
		} catch (err) {
			console.log("Invalid token", err);
			return req;
		}

		return req;
	},
	signToken: function ({ email, username, _id }) {
		const payload = { email, username, _id };
		return jwt.sign({ data: payload }, process.env.AUTH_SECRET, { expiresIn: expiration });
	},
};
