const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

router.delete('/:id', async (req, res) => {
  const blogId = req.params.id
  await Blog.destroy({
    where: {
      id: blogId
    }
  })
  res.status(204).end()
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