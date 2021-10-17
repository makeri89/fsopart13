const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  expires: {
    type: DataTypes.DATE
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelname: 'session'
})

module.exports = Session
