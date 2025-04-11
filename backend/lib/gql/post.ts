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
import { IUser } from '../types/userContext'

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
    draft: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    author: { type: Author },
    replies: { type: new GraphQLList(Reply) },
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
        orderBy: {
          createdAt: 'desc',
        },
        take: POST_LIMIT,
      }),
  },

  userPosts: {
    type: new GraphQLList(Post),
    args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { userId }: { userId: string }) => {
      const posts = await prisma.post.findMany({
        where: {
          userId,
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
        draft: post.draft,
        createdAt: post.createdAt.toISOString(),
        author: {
          id: post.author.id,
          username: post.author.username,
        },
        replyCount: post.replies.length,
        likeCount: post.likedBy.length,
      }))
    },
  },

  singlePost: {
    type: new GraphQLNonNull(Post),
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { id }: { id: string }) =>
      await prisma.post.findFirst({
        where: { id },
        include: { author: true, replies: true },
      }),
  },
}

const postMutations = {
  createPost: {
    type: new GraphQLNonNull(Post),
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) },
      draft: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve: async (
      _: any,
      { text, draft }: { text: string; draft: boolean },
      context: { user: IUser | null }
    ) => {
      if (!context.user) {
        throw new Error('Authentication required')
      }
      const authorId = context.user.id

      const createdPost = await prisma.post.create({
        data: {
          text: text,
          draft: draft,
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

  publishDraft: {
    type: GraphQLBoolean,
    args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (
      _: any,
      { postId }: { postId: string },
      context: { user: IUser | null }
    ) => {
      if (!context.user) {
        throw new Error('Authentication required')
      }
      await prisma.post.update({
        where: { id: postId },
        data: { draft: false },
      })
    },
  },

  likePost: {
    type: GraphQLBoolean,
    args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (
      _: any,
      { postId }: { postId: string },
      context: { user: IUser | null }
    ) => {
      if (!context.user) {
        throw new Error('Authentication required')
      }
      const userId = context.user.id
      const post = await prisma.post.findUnique({
        where: { id: postId },
      })

      if (!post) {
        throw new Error('Post not found')
      }

      // Check if the user has already liked this post
      const isLiked = await prisma.post.findUnique({
        where: { id: postId },
        select: { likedBy: { where: { id: userId } } },
      })

      if (isLiked && isLiked.likedBy.length > 0) {
        // User already liked the post, so unlike it
        await prisma.post.update({
          where: { id: postId },
          data: {
            likedBy: {
              disconnect: { id: userId },
            },
          },
        })
        return false // Returning false to indicate it was unliked
      } else {
        // User has not liked the post yet, so like it
        await prisma.post.update({
          where: { id: postId },
          data: {
            likedBy: {
              connect: { id: userId },
            },
          },
        })
        return true // Returning true to indicate the post was liked
      }
    },
  },

  deletePost: {
    type: GraphQLBoolean,
    args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (
      _: any,
      { postId }: { postId: string },
      context: { user: IUser | null }
    ) => {
      if (!context.user) {
        throw new Error('Authentication required')
      }
      await prisma.post.delete({
        where: { id: postId, userId: context.user.id },
      })
    },
  },
}

export { Post, Author, postQueries, postMutations }
