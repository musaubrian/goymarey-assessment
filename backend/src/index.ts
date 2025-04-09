import express, { NextFunction, Request, Response } from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from '../lib/gql/schema'
import { ruruHTML } from 'ruru/server'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.get('/explorer', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    // @ts-expect-error
    req.user = null
    return next()
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      username: string
      createdAt: string
    }

    // @ts-expect-error
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    // context: ({ req }) => ({ user: (req as any).user }),
  })
)
app.listen(PORT, () => console.log(`Server running at :${PORT}`))
