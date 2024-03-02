import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./utils/auth"; // Import AuthProvider
import "./index.css";

const httpLink = createHttpLink({
	uri: `/graphql`,
});
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ApolloProvider client={client}>
		<AuthProvider>
			{" "}
			{/* Wrap App with AuthProvider */}
			<App />
		</AuthProvider>
	</ApolloProvider>
);
