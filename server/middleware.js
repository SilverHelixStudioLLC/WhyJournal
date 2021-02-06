const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.dataValues.isAdmin) {
    //user is an admin
    next()
  } else {
    const err = new Error('Forbidden, request requires elevated permissions')
    err.status = 401

    return next(err)
  }
}

const userIsSelfMiddleware = (req, res, next) => {
  if (req.user && req.user.dataValues.id === +req.params.userId) {
    //user is self
    next()
  } else {
    const err = new Error('Forbidden, request denied, invalid user')
    err.status = 401
    return next(err)
  }
}

module.exports = {
  adminMiddleware,
  userIsSelfMiddleware
}
