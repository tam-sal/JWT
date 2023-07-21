const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const generateToken = (res, userId) => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //https
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
  }
  catch (error) {
    res.status(500).json({ msg: 'error generating secured token', err: error.message })
  }

}

module.exports = generateToken