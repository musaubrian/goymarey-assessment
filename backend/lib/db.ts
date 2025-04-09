import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const POST_LIMIT = 50

export { prisma, POST_LIMIT }
