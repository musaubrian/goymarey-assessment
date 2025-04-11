import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { prisma } from '../db'
import { IUser } from '../types/userContext'

const Reply = new GraphQLObjectType({
  name: 'PostReply',
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
})

const replyMutations = {
  createReply: {
    type: new GraphQLNonNull(Reply),
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) },
      postId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _: any,
      { text, postId }: { text: string; postId: string },
      context: any
    ) => {
      // gotten from the context
      const authorId = context?.user.id as string

      await prisma.reply.create({
        data: {
          text,
          post: {
            connect: { id: postId },
          },
          author: {
            connect: { id: authorId },
          },
        },
      })
    },
  },
  deleteReply: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (
      _: any,
      { id }: { id: string },
      context: { user: IUser | null }
    ) => {
      if (!context.user) throw new Error('Authentication required')
      await prisma.reply.delete({
        where: { id, userId: context.user.id },
      })
    },
  },
}

export { Reply, replyMutations }
