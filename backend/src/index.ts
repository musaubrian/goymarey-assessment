import express from 'express'

const app = express()
const PORT = process.env.PORT || 3030

app.get('/', (_req, res) => {
  res.json({ msg: 'well hello there' })
})

app.listen(PORT, () => {
  console.log(`Server running at :${PORT}`)
})
