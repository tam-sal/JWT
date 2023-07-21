const { Router } = require('express')
const registerRouter = require('./register')
const authRouter = require('./auth.js')
const logoutRouter = require('./logout')
const userprofile = require('./userProfile')

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
  return res.json({ status: 'OK', server: 'Successfully connected' })
})

mainRouter.use('/register', registerRouter)
mainRouter.use('/auth', authRouter)
mainRouter.use('/logout', logoutRouter)
mainRouter.use('/userprofile', userprofile)

mainRouter.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    error: 'Invalid Endpoint'
  })
})

module.exports = mainRouter