const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name == 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return res.status(400).json({ error: error.message})
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.errors[0].message })
  } else if (error.name === 'SequelizeValidationError') {
    if (error.message === 'Validation error: Validation isEmail on username failed') {
      return res.status(400).json({ error: 'Username must be a valid email address' })
    } else if (error.message === 'Validation error: Validation min on year failed' ||
              error.message === 'Validation error: Validation max on year failed') {
      res.status(400).json({
        error: 'The year attribute must be somewhere between 1991 and the current year'
      })
    }
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (e) {
      console.log(e)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing'})
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}