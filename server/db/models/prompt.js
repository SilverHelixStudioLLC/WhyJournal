const Sequelize = require('sequelize');
const db = require('../db');

const Prompt = db.define('prompt', {
  subject: {
    type: Sequelize.STRING,
  },
});

module.exports = Prompt;
