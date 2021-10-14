const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (_req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author', 
      [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author'
  })
  console.log(authors)
  res.json(authors)
})

module.exports = router