const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const { UserModel } = require('./models')


dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env
const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    native: false,
    logging: false
  }
)

UserModel(database)

//const { User } = database.models

module.exports = {
  database,
  ...database.models
}
