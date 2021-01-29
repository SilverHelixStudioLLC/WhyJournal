const router = require('express').Router();
const { Prompt } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll();
    prompts ? res.json(prompts) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.get('/:promptId', async (req, res, next) => {
  try {
    // console.log(req.params.promptId)
    const prompt = await Prompt.findByPk(req.params.promptId);
    prompt ? res.json(prompt) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPrompt = await Prompt.create(req.body);
    newPrompt ? res.json(newPrompt) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:promptId', async (req, res, next) => {
  try {
    const [numUpdated, updatedPrompts] = await Prompt.update(req.body, {
      where: { id: req.params.promptId },
      returning: true,
      plain: true,
    });
    updatedPrompts ? res.json(updatedPrompts[0]) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.delete('/:promptId', async (req, res, next) => {
  try {
    const promptDeleted = await Prompt.destroy({
      where: { id: req.params.promptId },
    });
    promptDeleted ? res.send('prompt deleted') : res.send('deletion failed');
  } catch (err) {
    next(err);
  }
});
