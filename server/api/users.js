const router = require('express').Router()
const { User } = require('../db/models')
const { userIsSelfMiddleware } = require('../middleware')

module.exports = router

router.put('/:userId', userIsSelfMiddleware, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      googleId,
      emailOptIn
    } = req.body
    const [, updatedUsers] = await User.update(
      {
        firstName,
        lastName,
        email,
        password,
        googleId,
        emailOptIn
      },
      {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      }
    )
    updatedUsers ? res.json(updatedUsers[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', userIsSelfMiddleware, async (req, res, next) => {
  try {
    const userDeleted = await User.destroy({
      where: { id: req.params.userId }
    })
    userDeleted ? res.send('user deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})
