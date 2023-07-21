const { Router } = require('express')
const handleNewUser = require('../controllers/registerController')
const generateToken = require('../utils/generateToken.js')


const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    const newUser = await handleNewUser(email, password)
    generateToken(res, await newUser.id)
    return res.status(201).json({ msg: 'user successfully created', newUser })

  }
  catch (error) {
    return res.status(error.code || 400).json({ err: error.message })
  }

})

module.exports = registerRouter