const router = require('express').Router()
const { Prompt } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll()
    prompts ? res.json(prompts) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:promptId', async (req, res, next) => {
  try {
    const prompt = await Prompt.findByPk(req.params.promptId)
    prompt ? res.json(prompt) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})
