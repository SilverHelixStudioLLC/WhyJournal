const router = require('express').Router()
const { Entry, User } = require('../db/models')
module.exports = router
const { userIsSelfMiddleware } = require('../middleware')

router.get('/user/:userId/', userIsSelfMiddleware, async (req, res, next) => {
  try {
    const entries = await Entry.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

router.get(
  '/user/:userId/count/entries',
  userIsSelfMiddleware,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId)
      const entryCount = await user.countEntries()
      res.json(entryCount)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/user/:userId/entry/:entryId',
  userIsSelfMiddleware,
  async (req, res, next) => {
    try {
      const { dataValues } = await Entry.findOne({
        where: {
          id: req.params.entryId,
          userId: req.params.userId
        }
      })
      res.json(dataValues)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/user/:userId/prompt/:promptId',
  userIsSelfMiddleware,
  async (req, res, next) => {
    try {
      const { dataValues } = await Entry.findOne({
        where: {
          promptId: req.params.promptId,
          userId: req.params.userId
        }
      })
      res.json(dataValues)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/', async (req, res, next) => {
  try {
    const newEntry = await Entry.create(req.body)
    newEntry ? res.json(newEntry) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put(
  '/user/:userId/entry/:entryId',
  userIsSelfMiddleware,
  async (req, res, next) => {
    try {
      const [, updatedEntries] = await Entry.update(req.body, {
        where: { id: req.params.entryId },
        returning: true,
        plain: true
      })
      updatedEntries ? res.json(updatedEntries[0]) : res.status(400).end()
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/user/:userId/entry/:entryId',
  userIsSelfMiddleware,
  async (req, res, next) => {
    try {
      const entryDeleted = await Entry.destroy({
        where: { id: req.params.entryId }
      })
      entryDeleted ? res.send('entry deleted') : res.send('deletion failed')
    } catch (err) {
      next(err)
    }
  }
)
