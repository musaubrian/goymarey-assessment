import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { userMutations, userQueries } from './user'
import { postMutations, postQueries } from './post'
import { replyMutations } from './reply'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQueries,
    ...postQueries,
  },
})

const RootMutations = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...userMutations,
    ...postMutations,
    ...replyMutations,
  },
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
})
