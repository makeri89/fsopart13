const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('readlists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('readlists')
  }
}