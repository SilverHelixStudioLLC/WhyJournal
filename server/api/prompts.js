const router = require('express').Router()
const { Op } = require("sequelize");
const { Prompt, Entry } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll()
    res.json(prompts)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userEntries = await Entry.findAll({
      where: {
        userId: req.params.userId
      }
    })
    const promptIdList = userEntries.map((en) => ({
      id: en.promptId
    }))
    const prompts = await Prompt.findAll({
      where: {
        [Op.or]: promptIdList
      }
    })
    res.json(prompts)
  } catch (err) {
    next(err)
  }
})

router.get('/id/:promptId', async (req, res, next) => {
  try {
    const prompt = await Prompt.findByPk(req.params.promptId)
    res.json(prompt)
  } catch (err) {
    next(err)
  }
})
