const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: '%' + req.query.search + '%'
          }
        },
        {
          author: {
            [Op.iLike]: '%' + req.query.search + '%'
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name', 'username']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const currentUser = await User.findByPk(req.decodedToken.id)
  const blogId = req.params.id
  const blog = await Blog.findOne({
    where: {
      id: blogId
    }
  })
  if (blog.userId === currentUser.id) {
    await blog.destroy()
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'You are not the owner of this blog' })
  }
})

router.put('/:id', async (req, res) => {
  const blogId = req.params.id
  const blog = await Blog.findByPk(blogId)
  if (blog) {
    blog.likes = blog.likes + 1
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router