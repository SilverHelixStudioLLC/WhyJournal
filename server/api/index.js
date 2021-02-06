const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/admin', require('./admin'))
router.use('/entries', require('./entries'))
router.use('/prompts', require('./prompts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
