import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const expiration = "2h";

const AuthenticationError = new GraphQLError("Could not authenticate user.", {
	extensions: {
		code: "UNAUTHENTICATED",
	},
});

function authMiddleware({ req }) {
	let token = req.body.token || req.query.token || req.headers.authorization;

	if (req.headers.authorization) {
		token = token.split(" ").pop().trim();
	}
	if (!token) {
		console.log(`No token provided for ${req.method} ${req.path}`);
		return req;
	}
	try {
		const { data } = jwt.verify(token, process.env.AUTH_SECRET, { maxAge: expiration });
		req.user = data;
	} catch {
		console.log("Invalid token.");
		return req;
	}

	return req;
}
function signToken({ email, username, _id }) {
	const payload = { email, username, _id };
	return jwt.sign({ data: payload }, process.env.AUTH_SECRET, { expiresIn: expiration });
}
export default {
	AuthenticationError,
	authMiddleware,
	signToken,
};
