import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { prisma } from '../db'
import { compare, hashSync } from '@node-rs/bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

let User: GraphQLObjectType<any, any>
User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    following: { type: new GraphQLList(User) },
    followedBy: { type: new GraphQLList(User) },
  }),
})

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(User) },
  },
})

const userQueries = {
  user: {
    type: User,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_: any, { id }: { id: string }) =>
      await prisma.user.findUnique({
        where: { id },
        include: { followedBy: true, following: true },
      }),
  },
}

const userMutations = {
  createUser: {
    type: AuthPayload,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      const hashedPwd = hashSync(password)
      const user = await prisma.user.create({
        data: { email: email, username: username, password: hashedPwd },
      })

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' })
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      }
    },
  },

  loginUser: {
    type: AuthPayload,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { username } })
      if (!user || !(await compare(password, user.password))) {
        throw new Error('Invalid Credentials')
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '2h',
      })

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      }
    },
  },
}

export { User, userQueries, userMutations }
