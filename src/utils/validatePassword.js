const bcrypt = require('bcrypt')
const validatePassword = async (input, password) => {
  return await bcrypt.compare(input, password)
}

module.exports = validatePassword