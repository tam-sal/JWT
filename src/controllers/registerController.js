const bcrypt = require('bcrypt')
const { User } = require('../db')
require('dotenv').config()
const generateToken = require('../utils/generateToken')

const handleNewUser = async (email, password) => {
  let { SALT_ROUNDS } = process.env

  if (!email || !password) {
    const error = new Error('Bad Request: Email and password are required')
    error.code = 400
    throw error
  }
  const duplicateUser = await User.findOne({
    where: {
      email: email
    }
  })
  if (duplicateUser) {
    const error = new Error('Conflict (409): user already exists')
    error.code = 409
    throw error
  }

  try {
    const salt = await bcrypt.genSalt(+SALT_ROUNDS)
    const hashedPass = await bcrypt.hash(password, salt)
    const newUserObj = { 'email': email, 'password': hashedPass }
    const newUser = await User.create(newUserObj)
    return { id: newUser.id, email: newUser.email }
  }
  catch (error) {
    error = new Error('(500) Server error')
    error.code = 500
    return error
  }

}

module.exports = handleNewUser