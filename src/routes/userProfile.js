const { Router } = require('express')
const userProfileRouter = Router()
const { protect } = require('../middleware/authMiddleware.js')
const getUserProfile = require('../controllers/getUserProfile')

userProfileRouter.get('/', protect, async (req, res) => {
  const { email } = req
  try {
    const userProfile = await getUserProfile(email)
    return res.status(201).json(userProfile)
  }
  catch (error) {
    return res.status(error.code || 400).json({ err: error.message })
  }
})

module.exports = userProfileRouter
