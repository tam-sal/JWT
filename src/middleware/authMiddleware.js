const jwt = require('jsonwebtoken')
const { User } = require('../db')
require('dotenv').config()

const protect = async (req, res, next) => {
  let token = req.cookies.jwt
  if (!token || token === null) {
    error = new Error('Not authorized')
    error.code = 401
    return res.status(error.code).json({ message: error.message })
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { id } = decoded
    const foundUser = await User.findByPk(id)

    if (!foundUser) {
      const error = new Error('User not found')
      error.code = 404
      return res.status(error.code).json({ message: error.message })
    }

    req.email = foundUser.email
    next()
  }
  catch (error) {
    error = new Error('invalid token')
    error.code = 401
    return res.status(error.code).json({ message: error.message })
  }
}

module.exports = { protect }