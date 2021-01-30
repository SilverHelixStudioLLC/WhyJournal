const User = require('./user');
const Entry = require('./entry');
const Prompt = require('./prompt');

// ASSOCIATIONS
User.hasMany(Entry);
Entry.belongsTo(User);

Prompt.hasMany(Entry);
Entry.belongsTo(Prompt);

// EXPORTS
module.exports = {
  User,
  Entry,
  Prompt,
};
