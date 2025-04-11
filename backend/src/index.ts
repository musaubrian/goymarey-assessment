import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from '../lib/gql/schema'
import { ruruHTML } from 'ruru/server'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { IUser } from '../lib/types/userContext'

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.get('/explorer', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

app.all('/graphql', (req, res) => {
  const handler = createHandler({
    schema: schema,
    context: () => {
      const authHeader = req.headers.authorization
      const token = authHeader?.split(' ')[1]

      let user = null
      if (token) {
        try {
          user = jwt.verify(token, process.env.JWT_SECRET!) as IUser
          console.log('Auth successful, user:', user.username)
        } catch (e) {
          console.error('Token verification failed:', e)
        }
      }

      return { user }
    },
  })

  handler(req, res)
})

app.listen(PORT, () => console.log(`Server running at :${PORT}`))
