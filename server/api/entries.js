const router = require('express').Router();
const { Entry } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const entries = await Entry.findAll();
    entries ? res.json(entries) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId/', async (req, res, next) => {
  try {
    const entry = await Entry.findAll({where: {
      userId: req.params.userId,
    }});
    entry ? res.json(entry) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId/entry/:entryId', async (req, res, next) => {
  try {
    const entry = await Entry.findOne({
      where: {
        id: req.params.entryId,
        userId: req.params.userId,
      }
    });
    entry ? res.json(entry) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newEntry = await Entry.create(req.body);
    newEntry ? res.json(newEntry) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.put('/user/:userId/entry/:entryId', async (req, res, next) => {
  try {
    const [, updatedEntries] = await Entry.update(req.body, {
      where: { id: req.params.entryId },
      returning: true,
      plain: true,
    });
    updatedEntries ? res.json(updatedEntries[0]) : res.status(400).end();
  } catch (err) {
    next(err);
  }
});

router.delete('/user/:userId/entry/:entryId', async (req, res, next) => {
  try {
    const entryDeleted = await Entry.destroy({
      where: { id: req.params.entryId },
    });
    entryDeleted ? res.send('entry deleted') : res.send('deletion failed');
  } catch (err) {
    next(err);
  }
});
