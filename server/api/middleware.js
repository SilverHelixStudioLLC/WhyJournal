const adminMiddleware = (req, res, next) => {
  if (!req.session.user.isAdmin) {
    const err = new Error('Forbidden, request requires elevated permissions')
    err.status = 401

    return next(err)
  }
  next()
}

const userCheckMiddleware = (req, res, next) => {
  if (req.session.user && req.session.user.id !== req.params.userId) {
    const err = new Error('Forbidden, request denied, invalid user')
    err.status = 401

    return next(err)
  }
  next()
}

const isUserOrAdminMiddleware = (req, res, next) => {
  if (req.session.user.id === req.params.userId || req.session.user.isAdmin) {
    next()
  } else {
    const err = new Error('Forbidden, request denied, invalid credentials')
    err.status = 401

    return next(err)
  }
}

module.exports = {
  adminMiddleware,
  userCheckMiddleware,
  isUserOrAdminMiddleware
}
