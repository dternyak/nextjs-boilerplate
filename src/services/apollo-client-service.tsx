import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null as any;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState: {}) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'https://swapi.graph.cool/', // Server URL (must be absolute)
      credentials: 'include' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
