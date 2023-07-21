const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const mainRouter = require('./routes/mainRouter.js')
const cookieParser = require('cookie-parser')



const app = express()


//*MW
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/', mainRouter)


module.exports = app