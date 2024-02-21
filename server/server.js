import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import path from "path";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticationMiddleware } from "./utils/authentication.js";
// pending to import authMiddleware from authentication.js
// pending to import typeDefs and resolvers  from schemas
import db from "./config/connection.js";

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startServer = async () => {
	app.use(cors());
	await server.start();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use("/graphql", expressMiddleware(server), { context: authenticationMiddleware }); // Add auth middleware

	if (process.env.NODE_ENV === "production") {
		app.use(express.static("../client/dist"));
		app.get("*", (req, res) => {
			res.sendFile(path.resolve("../client/dist/index.html"));
		});
		db.once("open", () => {
			app.listen(PORT, () => {
				console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
			});
		});
	}
};

startApolloServer();
