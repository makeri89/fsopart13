const router = require('express').Router()
const { Readlist, Session, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const readlist = await Readlist.create({
    userId: req.body.user_id,
    blogId: req.body.blog_id
  })
  res.json(readlist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readlist = await Readlist.findByPk(req.params.id)
  const sid = await Session.findByPk(req.cookies.sid)
  const user = await User.findByPk(req.decodedToken.id)
  if (!sid || user.disabled || sid.expires < new Date()) {
    res.status(401).json({
      error: 'authentication failed'
    })
  } else if (readlist.userId === req.decodedToken.id) {
    readlist.read = req.body.read
    readlist.save()
    res.json(readlist)
  } else {
    res.status(401).json({ error: 'Unauthorized'})
  }
})

module.exports = router