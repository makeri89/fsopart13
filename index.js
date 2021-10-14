const express = require('express')
const cors = require('cors')
const app = express()
require('express-async-errors')

const { unknownEndpoint, errorHandler } = require('./util/middleware')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/author')

app.use(express.json())
app.use(cors())

// app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start()
