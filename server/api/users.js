const router = require('express').Router()
const {User} = require('../db/models')
const {adminMiddleware, isUserOrAdminMiddleware} = require('./middleware')

module.exports = router

router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isUserOrAdminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user ? res.json(user) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      googleId,
      emailOptIn
    } = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      googleId,
      emailOptIn
    })
    newUser ? res.json(newUser) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isUserOrAdminMiddleware, async (req, res, next) => {
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
        where: {id: req.params.userId},
        returning: true,
        plain: true
      }
    )
    updatedUsers ? res.json(updatedUsers[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isUserOrAdminMiddleware, async (req, res, next) => {
  try {
    const userDeleted = await User.destroy({
      where: {id: req.params.userId}
    })
    userDeleted ? res.send('user deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})
