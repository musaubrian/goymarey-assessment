import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { SCHEMA_URL } from './constants'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: SCHEMA_URL,
    credentials: 'include',
  }),
})
