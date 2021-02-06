const Sequelize = require('sequelize')
const db = require('../db')

const Prompt = db.define('prompt', {
  subject: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})

module.exports = Prompt
