const { User } = require('../db.js')

const getUserProfile = async (email) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    })
    return { id: existingUser.id, email: existingUser.email }
  }
  catch (error) {
    error = new Error('user not found')
    error.code = 404
    throw error

  }
}

module.exports = getUserProfile