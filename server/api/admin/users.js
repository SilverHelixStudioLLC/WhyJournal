const router = require('express').Router()
const { User } = require('../../db/models')
const { adminMiddleware } = require('../../middleware')

module.exports = router

router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'isAdmin',
        'emailOptIn'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user ? res.json(user) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', adminMiddleware, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      googleId,
      isAdmin,
      emailOptIn
    } = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      googleId,
      isAdmin,
      emailOptIn
    })
    newUser ? res.json(newUser) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      currentPrompt,
      email,
      password,
      googleId,
      isAdmin,
      emailOptIn
    } = req.body
    const [, updatedUsers] = await User.update(
      {
        firstName,
        lastName,
        currentPrompt,
        email,
        password,
        googleId,
        isAdmin,
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

router.delete('/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const userDeleted = await User.destroy({
      where: { id: req.params.userId }
    })
    userDeleted ? res.send('user deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})
