const router = require('express').Router()
const { Prompt } = require('../../db/models')
const { adminMiddleware } = require('../../middleware')

module.exports = router

// admin only actions below
router.post('/', adminMiddleware, async (req, res, next) => {
  try {
    const newPrompt = await Prompt.create(req.body)
    newPrompt ? res.json(newPrompt) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:promptId', adminMiddleware, async (req, res, next) => {
  try {
    const [, updatedPrompts] = await Prompt.update(req.body, {
      where: { id: req.params.promptId },
      returning: true,
      plain: true
    })
    updatedPrompts ? res.json(updatedPrompts[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:promptId', adminMiddleware, async (req, res, next) => {
  try {
    const promptDeleted = await Prompt.destroy({
      where: { id: req.params.promptId }
    })
    promptDeleted ? res.send('prompt deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})
