const { Router } = require('express')
const singoutHandler = require('../controllers/signoutController.js')
const logoutRouter = Router()

logoutRouter.post('/', async (req, res) => {
  try {
    const logout = await singoutHandler(res)
    return res.status(logout.status).json({ msg: logout.msg })
  }
  catch (error) {
    return res.status(404).json({ msg: 'error logging out' })

  }
})

module.exports = logoutRouter