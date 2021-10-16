const Blog = require('./blog')
const User = require('./user')
const Readlist = require('./readlist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readlist, as: 'userReadings' })
Blog.belongsToMany(User, { through: Readlist, as: 'readings' })

module.exports = {
  Blog,
  User,
  Readlist
}