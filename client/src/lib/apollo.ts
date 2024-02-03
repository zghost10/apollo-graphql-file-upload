import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: (createUploadLink({
    uri: `${import.meta.env.VITE_API_URL}/gql`,
    credentials: 'include',
    headers: {'Apollo-Require-Preflight': 'true'}
  }) as unknown) as ApolloLink
});