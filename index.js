require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }    
  },
  logging: false
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'Blog'
})

app.get('/api/blogs', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id
  await Blog.destroy({
    where: {
      id: blogId
    }
  })
  res.status(204)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})