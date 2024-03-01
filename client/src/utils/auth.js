import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Replace with your GraphQL API endpoint (HTTP)
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Replace with your GraphQL subscriptions endpoint (WebSocket)
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/graphql',
  options: { reconnect: true },
});

// Split link to handle subscriptions vs. regular queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Add Authorization Header 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Configure Apollo Client - add authLink before httpLink 
const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;