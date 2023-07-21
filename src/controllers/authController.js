const { User } = require('../db')
require('dotenv').config()
const validatePassword = require('../utils/validatePassword')


const handleLogin = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Bad Request: Email and password are required')
    error.code = 400
    throw error
  }
  const foundUser = await User.findOne({
    where: {
      email: email
    }
  })
  if (!foundUser) {
    error = new Error(`Unauthorized (401): Invalid email or password`)
    error.code = 401
    throw error
  }
  //* evaluate password
  const passwordMatch = await validatePassword(password, foundUser.password)
  if (!passwordMatch) {
    const error = new Error('Unauthorized (401): Invalid password')
    error.code = 401
    throw error
  }
  return { code: 200, msg: `user ${email} is logged in.`, id: foundUser.id }

}
module.exports = handleLogin