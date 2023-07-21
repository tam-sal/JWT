const { Router } = require('express')
const handleLogin = require('../controllers/authController')
const generateToken = require('../utils/generateToken.js')

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    const loggedUser = await handleLogin(email, password)
    generateToken(res, await loggedUser.id)
    return res.status(loggedUser.code).json({ msg: loggedUser.msg })
  }

  catch (error) {
    return res.status(error.code || 400).json({ err: error.message })
  }

})

module.exports = loginRouter