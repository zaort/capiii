import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import path from "path";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import auth from "./utils/authentication.js";
const { signToken, AuthenticationError, authenticationMiddleware } = auth;

import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authenticationMiddleware,
});

const startServer = async () => {
	await server.start();

	if (process.env.NODE_ENV === "production") {
		server.express.use(express.static("../client/dist"));
		server.ex.get("*", (req, res) => {
			res.sendFile(path.resolve("../client/dist/index.html"));
		});
	}

	console.log("Attempting to connect to database...");
	db.on("error", console.error.bind(console, "MongoDB connection error:"));
	db.once("open", async () => {
		await server.listen(PORT);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
};

startServer();
