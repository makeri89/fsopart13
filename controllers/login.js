const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')

const { SECRET } = require('../util/config')
const { User, Session  } = require('../models')

router.post('/', async (req, res) => {
  if (req.cookies.sid) {
    return res.status(403).json({
      error: 'please log out first'
    })
  }

  const body = req.body
  const user = await User.findOne({
    where: {
      username: body.username,
    }
  })

  const passwordCorrect = body.password === 'sekret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  const sessionId = uuidv4()
  const date = new Date()
  const expirationTime = 4 * 60 * 60 * 1000 // 4 hours

  await Session.create({
    sid: sessionId,
    expires: new Date(date.getTime() + expirationTime),
    userId: user.id
  })

  res
    .cookie('sid', sessionId, { maxAge: expirationTime })
    .status(200)
    .send({
      token, username: user.username, name: user.name
    })
})

module.exports = router