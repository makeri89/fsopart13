const { DataTypes } = require('sequelize')

const date = new Date()

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: date.getFullYear()
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}