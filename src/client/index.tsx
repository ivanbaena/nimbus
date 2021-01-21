import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './Routes';

// import './styles/index.css';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userPosts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <Router>{renderRoutes(Routes)}</Router>
  </ApolloProvider>,
  document.getElementById('root')
);
