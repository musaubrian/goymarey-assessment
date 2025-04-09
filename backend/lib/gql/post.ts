import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { POST_LIMIT, prisma } from '../db'
import { Reply } from './reply'

const DraftPosts = new GraphQLObjectType({
  name: 'DraftPosts',
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
})

const Author = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  },
})

const Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    author: { type: Author },
    replies: { type: Reply },
    replyCount: { type: GraphQLInt },
    likeCount: { type: GraphQLInt },
  },
})

const postQueries = {
  allPosts: {
    type: new GraphQLList(Post),
    resolve: async () =>
      await prisma.post.findMany({
        where: {
          draft: { equals: false },
        },
        include: {
          author: true,
          replies: { select: { id: true } },
          likedBy: { select: { id: true } },
        },
        take: POST_LIMIT,
      }),
  },

  myPosts: {
    type: new GraphQLList(Post),
    args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { userId }: { userId: string }) => {
      const posts = await prisma.post.findMany({
        where: {
          userId,
          draft: { equals: false },
        },
        include: {
          author: true,
          replies: { select: { id: true } },
          likedBy: { select: { id: true } },
        },
        take: POST_LIMIT,
      })
      return posts.map((post) => ({
        id: post.id,
        text: post.text,
        createdAt: post.createdAt.toISOString(),
        author: {
          id: post.author.id,
          username: post.author.username,
        },
        replyCount: post.replies.length,
        likeCount: post.likedBy.length,
      }))
    },

    post: {
      type: new GraphQLNonNull(Post),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_: any, { id }: { id: string }) =>
        await prisma.post.findFirst({
          where: { id },
          include: { author: true, replies: true },
        }),
    },
  },

  myDrafts: {
    type: new GraphQLList(DraftPosts),
    args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { userId }: { userId: string }) =>
      await prisma.post.findMany({
        where: {
          userId,
          draft: { equals: true },
        },
        include: { author: true },
      }),
  },
}

const postMutations = {
  createPost: {
    type: new GraphQLNonNull(Post),
    args: { text: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_: any, { text }: { text: string }, context: any) => {
      // gotten from the context
      const authorId = context?.user.id as string

      const createdPost = await prisma.post.create({
        data: {
          text: text,
          author: {
            connect: { id: authorId },
          },
        },
        include: { author: true },
      })

      return {
        id: createdPost.id,
        text: createdPost.text,
        createdAt: createdPost.createdAt.toISOString(),
        author: {
          id: createdPost.author.id,
          username: createdPost.author.username,
        },
        replyCount: 0,
        likeCount: 0,
      }
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { postId }: { postId: string }) => {
      postId
      return false
    },
  },
}

export { Post, DraftPosts, Author, postQueries, postMutations }
