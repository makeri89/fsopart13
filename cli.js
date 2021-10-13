require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

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

const main = async () => {
  try {
    const blogs = await Blog.findAll()
    blogs.forEach((blog) => {
      const data = blog.dataValues
      console.log(`${data.author}: '${data.title}', ${data.likes} likes`)
    })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
} 

main()