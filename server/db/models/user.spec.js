/* global describe beforeEach it */

const { expect } = require('chai');
const { default: userHome } = require('../../../client/components/user-home');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let user;

      beforeEach(async () => {
        user = await User.create({
          email: 'user@email.com',
          password: '123',
        });
      });

      it('returns true if the password is correct', () => {
        expect(user.correctPassword('123')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(user.correctPassword('345')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
