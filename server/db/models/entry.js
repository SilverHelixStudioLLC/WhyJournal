const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING(5000)
  }
})

module.exports = Entry
