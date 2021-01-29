const User = require('./user');
const Entry = require('./entry');
const Prompt = require('./prompt');

// ASSOCIATIONS
User.hasMany(Entry);
Entry.belongsTo(User);

Entry.hasOne(Prompt);
Prompt.belongsTo(Entry);

// EXPORTS
module.exports = {
  User,
  Entry,
  Prompt,
};
