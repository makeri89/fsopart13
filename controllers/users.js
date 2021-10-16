const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'author', 'likes','url']
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'userReadings',
      attributes: ['title', 'author', 'likes', 'url', 'year'],
      through: {
        attributes: ['id', 'read'],
        where
      }
    }
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    }
  })
  user.name = req.body.name
  user.save()
  res.json(user)
})

module.exports = router